const psicossocialDataUseCase = require("../useCases/psicossocialDataUseCase");

async function psicossocialController(req, res) {
  try {
    // pega os parametros da query
    const { time_range, sex, age, cid } = req.query;
    // busca os dados
    const data = await psicossocialDataUseCase(time_range, sex, age, cid);
    // retorna os dados em json
    res.json({ status: "success", data: data });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = {
  psicossocialController,
};
