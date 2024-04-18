const pool = require("../config/dbConfig");

async function fetchPsicossocialData(sex, cid, time_range, age) {
    // query inicial
    let query = `
      SELECT p.dt_atend, p.ufmun, p.idadepac, p.sexopac, s.cd_descr
      FROM psicossocial.psrs p
      JOIN psicossocial.s_cid s ON p.cidpri = s.cd_cod
      WHERE p.ufmun = '431020'
    `;

    const params = [];

    /*
     * caso exista algum filtro, adiciona a query e ao params
     */

    if (sex) {
        query += ` AND p.sexopac = $${params.length + 1}`;
        params.push(sex);
    }
    if (cid) {
        query += ` AND s.cd_cod = $${params.length + 1}`;
        params.push(cid);
    }
    if (time_range) {
        // dividindo o intervalo de tempo
        const [startYearMonth, endYearMonth] = time_range.split("-");

        // pegando data de inicio e fim
        const startDate = `${startYearMonth.slice(0, 4)}-${startYearMonth.slice(
            4
        )}-01`; // usando o primeiro dia do mes
        const endDate = `${endYearMonth.slice(0, 4)}-${endYearMonth.slice(
            4
        )}-28`; // usando o ultimo dia do mes

        query += ` AND TO_DATE(p.dt_atend, 'YYYYMM') BETWEEN $${
            params.length + 1
        } AND $${params.length + 2}`;
        params.push(startDate);
        params.push(endDate);
    }
    if (age) {
        // dividindo o intervalo de idade
        const [startAge, endAge] = age.split("-");

        query += ` AND CAST(p.idadepac AS INTEGER) BETWEEN $${
            params.length + 1
        } AND $${params.length + 2}`;
        params.push(startAge);
        params.push(endAge);
    }

    //console.log("Query: ", query);
    //console.log("Params: ", params);

    const { rows } = await pool.query(query, params);
    return rows;
}

module.exports = {
    fetchPsicossocialData,
};
