const pool = require("../config/dbConfig");

async function testConnectionController(req, res) {
  try {
    await pool.connect();
    let message = "Connected to database";
    console.log(message);
    res.json({ status: "success", message });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = {
  testConnectionController,
};
