const psicossocialDataService = require("../services/psicossocialDataService");

async function psicossocialController(req, res) {
    try {
        // pega os parametros da query
        const { time_range, sex, age, cid } = req.query;
        // busca os dados
        const data = await psicossocialDataService(time_range, sex, age, cid);
        // retorna os dados em json
        res.json({
            status: "success",
            data: data,
            filters: { time_range: time_range, cid: cid, sex: sex, age: age },
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = {
    psicossocialController,
};
