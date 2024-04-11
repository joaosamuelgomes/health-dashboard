function psicossocialFilter(data, time_range, age) {
  // converte o valor da idade, se presente
  let startNumAge, endNumAge;
  if (age) {
    let ageMin = age.split("-")[0];
    let ageMax = age.split("-")[1];
    startNumAge = Number(ageMin);
    endNumAge = Number(ageMax);
  }

  // converte os valores do intervalo de tempo, se presente
  let startNumTimeRange, endNumTimeRange;
  if (time_range) {
    let timeRangeStart = time_range.split("-")[0];
    let timeRangeEnd = time_range.split("-")[1];
    startNumTimeRange = Number(timeRangeStart);
    endNumTimeRange = Number(timeRangeEnd);
  }

  // filtra os dados
  const filteredData = data.filter((item) => {
    // Converte o valor da idade, se presente
    const idadepac = age ? Number(item.idadepac) : null;
    // Converte o valor do timestamp, se presente
    const dataAtendimento = time_range ? Number(item.dt_atend) : null;

    // Verifica se a idade está dentro do intervalo, se a idade e o intervalo de tempo estiverem presentes
    const isAgeValid = age
      ? idadepac >= startNumAge && idadepac <= endNumAge
      : true;
    // Verifica se o timestamp está dentro do intervalo, se a idade e o intervalo de tempo estiverem presentes
    const isTimeRangeValid = time_range
      ? dataAtendimento >= startNumTimeRange &&
        dataAtendimento <= endNumTimeRange
      : true;

    // Retorna true se tanto a idade quanto o timestamp estiverem dentro dos intervalos especificados, ou se nenhum filtro estiver presente
    return isAgeValid && isTimeRangeValid;
  });

  //retorna os dados
  //console.log("filteredData: ", filteredData)
  return filteredData;
}

module.exports = {
  psicossocialFilter,
};
