const express = require("express");
const router = require("./routes");
const cors = require('cors');

const app = express();

// Configuração do CORS para permitir solicitações do localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});