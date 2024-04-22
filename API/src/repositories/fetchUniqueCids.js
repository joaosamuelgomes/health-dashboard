const pool = require("../config/dbConfig");

async function fetchUniqueCids() {
    // Query para selecionar os códigos CID únicos
    const query = `
        SELECT DISTINCT s.cd_cod
        FROM psicossocial.psrs p
        JOIN psicossocial.s_cid s ON p.cidpri = s.cd_cod
    `;

    const { rows } = await pool.query(query);
    return rows.map((row) => row.cd_cod);
}

module.exports = {
    fetchUniqueCids,
};
