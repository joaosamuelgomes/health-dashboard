function sumCid(data) {
    const totalCid = {};

    data.forEach((item) => {
        const cid = item.cd_descr;
        const gender = item.sexopac;

        if (cid in totalCid) {
            totalCid[cid].genderCounts[gender]++;
            totalCid[cid].total++;
        } else {
            // se o cd_desc nao existe no array, cria o objeto
            totalCid[cid] = {
                name: cid,
                genderCounts: {
                    M: gender === "M" ? 1 : 0,
                    F: gender === "F" ? 1 : 0,
                },
                total: 1,
            };
        }
    });

    // retorna um array com os valores do objeto totalCid
    return Object.values(totalCid);
}

module.exports = {
    sumCid,
};
