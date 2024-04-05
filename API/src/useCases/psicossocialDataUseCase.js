const {
  fetchPsicossocialData,
} = require("../repositories/fetchPsicossocialData.js");
const { filterByTimeRange } = require("../utils/timeRangeFilter");

async function psicossocialDataUseCase(time_range, sex, age, cid) {
  try {
    // console.log("time_range: ", time_range);
    // console.log("sex: ", sex);
    // console.log("age: ", age);
    // console.log("cid: ", cid);

    // busca os dados no banco de dados
    const data = await fetchPsicossocialData(sex, age, cid);
    // filtra os dados pelo intervalo de tempo caso exista
    if (time_range) {
      return filterByTimeRange(data, time_range);
    }
    return data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

module.exports = psicossocialDataUseCase;
