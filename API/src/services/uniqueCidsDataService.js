const { fetchUniqueCids } = require("../repositories/fetchUniqueCids.js");

async function uniqueCidsDataService() {
    try {
        let data = await fetchUniqueCids();

        return data;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

module.exports = uniqueCidsDataService;
