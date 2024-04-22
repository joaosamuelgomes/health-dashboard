const express = require("express");
const psicossocialRouter = require("./psicossocial.routes");
const testConnectionRouter = require("./testConnection.routes");
const cidAtemporalRouter = require("./cidAtemporal.routes");
const uniqueCidsRouter = require("./uniqueCids.routes");

// create router instance
const router = express.Router();
router.use(psicossocialRouter);
router.use(testConnectionRouter);
router.use(cidAtemporalRouter);
router.use(uniqueCidsRouter);

module.exports = router;
