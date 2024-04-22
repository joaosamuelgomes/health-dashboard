const cidAtemporalDataService = require("../services/cidAtemporalDataService");

async function cidAtemporalController(req, res) {
    try {
        // pega os parametros da query
        const { time_range, cid } = req.query;
        // busca os dados
        const data = await cidAtemporalDataService(time_range, cid);
        // retorna os dados em json
        res.json({
            status: "success",
            data: data,
            filters: { time_range: time_range, cid: cid },
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = {
    cidAtemporalController,
};
