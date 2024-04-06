const express = require("express");
const psicossocialRouter = require("./psicossocial.routes");
const testConnectionRouter = require("./testConnection.routes");

// create router instance
const router = express.Router();
router.use(psicossocialRouter);
router.use(testConnectionRouter);

module.exports = router;
