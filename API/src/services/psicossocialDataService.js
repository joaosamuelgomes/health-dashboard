const {
  fetchPsicossocialData,
} = require("../repositories/fetchPsicossocialData.js");
const { psicossocialFilter } = require("../utils/psicossocialFilters.js");
const { sumCid } = require("../utils/sumCid.js");

async function psicossocialDataService(time_range, sex, age, cid) {
  try {
    // converte o sexo para maiúsculo
    const uppercaseSex = sex ? sex.toUpperCase() : null;
    const uppercaseCid = cid ? cid.toUpperCase() : null;
    // busca os dados no banco de dados
    let data = await fetchPsicossocialData(uppercaseSex, uppercaseCid);
    //console.log(data);
    // filtra os dados
    if (time_range || age) {
      data = psicossocialFilter(data, time_range, age);
    }
    // soma os cids
    //console.log(`data -> `,data)
    somaCid = sumCid(data);
    return {
      data: data,
      somaCids: somaCid,
      filtros: { time_range: time_range, sex: sex, age: age, cid: cid },
    };
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

module.exports = psicossocialDataService;
