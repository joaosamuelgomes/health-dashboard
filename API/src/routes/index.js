const express = require("express");
const router = express.Router();
const {
  testConnectionController,
} = require("../controller/testConnectionController");
const {
  psicossocialController,
} = require("../controller/psicossocialController");

router.get("/testConnection", testConnectionController);
router.get("/psicossocial", (req, res) => psicossocialController(req, res));

module.exports = router;
