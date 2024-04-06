const {
  fetchPsicossocialData,
} = require("../repositories/fetchPsicossocialData.js");
const { filterByTimeRange } = require("../utils/timeRangeFilter.js");
const { filterByAge } = require("../utils/ageFilter.js");

async function psicossocialDataService(time_range, sex, age, cid) {
  try {
    // console.log("time_range: ", time_range);
    // console.log("sex: ", sex);
    // console.log("age: ", age);
    // console.log("cid: ", cid);

    // converte o sexo para maiúsculo
    const uppercaseSex = sex ? sex.toUpperCase() : null;
    // busca os dados no banco de dados
    let data = await fetchPsicossocialData(uppercaseSex, cid);
    //console.log(data);
    // filtra os dados pelo intervalo de tempo caso exista
    if (time_range) {
      data = filterByTimeRange(data, time_range);
    }
    // filtra os dados pela idade do paciente caso exista
    if (age) {
      data = filterByAge(data, age);
    }
    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

module.exports = psicossocialDataService;
