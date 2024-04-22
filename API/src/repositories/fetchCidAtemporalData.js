const pool = require("../config/dbConfig");

async function fetchCidAtemporalData(cid, time_range) {
    // Query inicial
    let query = `
    SELECT TO_CHAR(TO_DATE(p.dt_atend, 'YYYYMMDD'), 'YYYYMM') as yearMonth, COUNT(*) as ocorrencias
    FROM psicossocial.psrs p
    JOIN psicossocial.s_cid s ON p.cidpri = s.cd_cod
    WHERE 1 = 1 AND p.ufmun = '431020'
    `;

    const params = [];

    /*
     * Adiciona filtros à consulta, conforme necessário
     */

    if (time_range) {
        // Dividindo o intervalo de tempo
        const [startYearMonth, endYearMonth] = time_range.split("-");
        // Pegando a data de início e fim
        const startDate = `${startYearMonth.slice(0, 4)}-${startYearMonth.slice(
            4
        )}-01`; // Usando o primeiro dia do mês
        const endDate = `${endYearMonth.slice(0, 4)}-${endYearMonth.slice(
            4
        )}-28`; // Usando o último dia do mês
        query += ` AND TO_DATE(p.dt_atend, 'YYYYMMDD') BETWEEN TO_DATE($${
            params.length + 1
        }, 'YYYY-MM-DD') AND TO_DATE($${params.length + 2}, 'YYYY-MM-DD')`;
        params.push(startDate);
        params.push(endDate);
    }
    if (cid) {
        query += ` AND s.cd_cod = $${params.length + 1}`;
        params.push(cid);
    }

    query += ` GROUP BY TO_CHAR(TO_DATE(p.dt_atend, 'YYYYMMDD'), 'YYYYMM') ORDER BY yearMonth`;

    const { rows } = await pool.query(query, params);
    return rows;
}

module.exports = {
    fetchCidAtemporalData,
};
