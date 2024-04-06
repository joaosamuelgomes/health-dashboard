const express = require("express");
const router = express.Router();
const {
  psicossocialController,
} = require("../controller/psicossocialController");

router.get("/psicossocial", (req, res) => psicossocialController(req, res));

module.exports = router;
