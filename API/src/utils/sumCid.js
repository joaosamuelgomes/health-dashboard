function sumCid(data) {
    const totalCid = {};

    data.forEach((item) => {
        const cid = item.cd_descr;
        const gender = item.sexopac;
        const age = item.idadepac;

        if (!(cid in totalCid)) {
            totalCid[cid] = {
                name: cid,
                genderCounts: {
                    M: 0,
                    F: 0,
                },
                ageCounts: {
                    "0-10": 0,
                    "11-20": 0,
                    "21-30": 0,
                    "31-40": 0,
                    "41-50": 0,
                    "51-60": 0,
                    "61-70": 0,
                    "71-80": 0,
                    "81-90": 0,
                    "91-100": 0,
                },
                total: 0,
            };
        }

        // Incrementa o total geral de consultas
        totalCid[cid].total++;

        // Incrementa a contagem por gênero
        totalCid[cid].genderCounts[gender]++;

        // Determina a faixa etária e incrementa a contagem correspondente usando switch case
        switch (true) {
            case age >= 0 && age <= 10:
                totalCid[cid].ageCounts["0-10"]++;
                break;
            case age >= 11 && age <= 20:
                totalCid[cid].ageCounts["11-20"]++;
                break;
            case age >= 21 && age <= 30:
                totalCid[cid].ageCounts["21-30"]++;
                break;
            case age >= 31 && age <= 40:
                totalCid[cid].ageCounts["31-40"]++;
                break;
            case age >= 41 && age <= 50:
                totalCid[cid].ageCounts["41-50"]++;
                break;
            case age >= 51 && age <= 60:
                totalCid[cid].ageCounts["51-60"]++;
                break;
            case age >= 61 && age <= 70:
                totalCid[cid].ageCounts["61-70"]++;
                break;
            case age >= 71 && age <= 80:
                totalCid[cid].ageCounts["71-80"]++;
                break;
            case age >= 81 && age <= 90:
                totalCid[cid].ageCounts["81-90"]++;
                break;
            case age >= 91 && age <= 100:
                totalCid[cid].ageCounts["91-100"]++;
                break;
            default:
                break;
        }
    });

    return Object.values(totalCid);
}

module.exports = {
    sumCid,
};
