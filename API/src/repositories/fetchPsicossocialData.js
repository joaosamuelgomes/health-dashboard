const pool = require("../config/dbConfig");

async function fetchPsicossocialData(sex, age, cid) {
  // query inicial
  let query = `
      SELECT p.dt_atend, p.ufmun, p.idadepac, p.sexopac, s.cd_descr
      FROM psicossocial.psrs p
      JOIN psicossocial.s_cid s ON p.cidpri = s.cd_cod
    `;

  const params = [];

  // caso exista algum filtro, adiciona a query e ao params
  if (sex) {
    query += " AND p.sexopac = $1";
    params.push(sex);
  }

  if (age) {
    query += ` AND p.idadepac = $${params.length + 1}`;
    params.push(age);
  }

  if (cid) {
    query += ` AND s.cd_cod = $${params.length + 1}`;
    params.push(cid);
  }

  query += " ORDER BY p.dt_atend ASC";

  //   console.log("Query: ", query);
  //   console.log("Params: ", params);

  const { rows } = await pool.query(query, params);
  return rows;
}

module.exports = {
  fetchPsicossocialData,
};