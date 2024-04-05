async function filterByTimeRange(data, time_range) {
  // converte os valores do intervalo
  timeRangeStart = time_range.split("-")[0];
  timeRangeEnd = time_range.split("-")[1];
  const startNum = Number(timeRangeStart);
  const endNum = Number(timeRangeEnd);
  console.log("startNum: ", startNum);
    console.log("endNum: ", endNum);
    //console.log(data)

  // filtra os dados
  const filteredData = data.filter((item) => {
    // converte o valor do timestamp
    const dataAtendimento = Number(item.dt_atend);
    console.log("dataAtendimento: ", dataAtendimento);

    // verifica se o timestamp está dentro do intervalo
    return dataAtendimento >= startNum && dataAtendimento <= endNum;
  });

  console.log("filteredData: ", filteredData);
  //retorna os dados
  return filteredData;
}

module.exports = {
  filterByTimeRange,
};
