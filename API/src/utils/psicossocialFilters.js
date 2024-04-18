function psicossocialFilter(data, time_range, age) {
    let startNumAge, endNumAge;
    if (age) {
        let ageMin = age.split("-")[0];
        let ageMax = age.split("-")[1];
        startNumAge = Number(ageMin);
        endNumAge = Number(ageMax);
    }

    let startNumTimeRange, endNumTimeRange;
    if (time_range) {
        let timeRangeStart = time_range.split("-")[0];
        let timeRangeEnd = time_range.split("-")[1];
        startNumTimeRange = Number(timeRangeStart);
        endNumTimeRange = Number(timeRangeEnd);
    }

    // filtra os dados
    const filteredData = data.filter((item) => {
        const idadepac = age ? Number(item.idadepac) : null;
        const dataAtendimento = time_range ? Number(item.dt_atend) : null;

        // se tiver uma idade verifica se a idade esta dentro do intervalo
        const isAgeValid = age
            ? idadepac >= startNumAge && idadepac <= endNumAge
            : true;
        // se tiver um time range verifica se a data esta dentro do intervalo
        const isTimeRangeValid = time_range
            ? dataAtendimento >= startNumTimeRange &&
              dataAtendimento <= endNumTimeRange
            : true;

        return isAgeValid && isTimeRangeValid;
    });

    //retorna os dados
    //console.log("filteredData: ", filteredData)
    return filteredData;
}

module.exports = {
    psicossocialFilter,
};
