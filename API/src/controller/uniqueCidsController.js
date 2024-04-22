const uniqueCidsDataService = require("../services/uniqueCidsDataService");

async function uniqueCidsController(req, res) {
    try {
        // busca os dados
        const data = await uniqueCidsDataService();
        // retorna os dados em json
        console.log({ status: "success", data: data });
        res.json({ status: "success", data: data });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = {
    uniqueCidsController,
};
