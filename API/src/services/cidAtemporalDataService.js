const {
    fetchCidAtemporalData,
} = require("../repositories/fetchCidAtemporalData.js");

async function cidAtemporalDataService(time_range, cid) {
    try {
        const uppercaseCid = cid ? cid.toUpperCase() : null;

        /*
         * busca os dados no banco de dados
         */

        let data = await fetchCidAtemporalData(uppercaseCid, time_range);

        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

module.exports = cidAtemporalDataService;
