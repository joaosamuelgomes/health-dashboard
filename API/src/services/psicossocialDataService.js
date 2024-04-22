const {
    fetchPsicossocialData,
} = require("../repositories/fetchPsicossocialData.js");
const { sumCid } = require("../utils/sumCid.js");

async function psicossocialDataService(time_range, sex, age, cid) {
    try {
        const uppercaseSex = sex ? sex.toUpperCase() : null;
        const uppercaseCid = cid ? cid.toUpperCase() : null;

        /*
         * busca os dados no banco de dados
         */

        let data = await fetchPsicossocialData(
            uppercaseSex,
            uppercaseCid,
            time_range,
            age
        );

        /*
         * soma os cids
         */

        somaCid = sumCid(data);
        return {
            data: data,
            somaCids: somaCid,
        };
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

module.exports = psicossocialDataService;
