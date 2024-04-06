const express = require("express");
const router = express.Router();
const {
  testConnectionController,
} = require("../controller/testConnectionController");

router.get("/testConnection", testConnectionController);

module.exports = router;
