async function filterByAge(data, age) {
  // converte os valores do intervalo
  let ageMin = age.split("-")[0];
  let ageMax = age.split("-")[1];
  const startNum = Number(ageMin);
  const endNum = Number(ageMax);
  //console.log("startNum: ", startNum);
  //console.log("endNum: ", endNum);
  //console.log(data)

  // filtra os dados
  const filteredData = data.filter((item) => {
    // converte o valor da idade
    const idadepac = Number(item.idadepac);
    //console.log("idadepac: ", idadepac);

    // verifica se a idade está dentro do intervalo
    return idadepac >= startNum && idadepac <= endNum;
  });

  //console.log("filteredData: ", filteredData);
  //retorna os dados
  return filteredData;
}

module.exports = {
  filterByAge,
};
