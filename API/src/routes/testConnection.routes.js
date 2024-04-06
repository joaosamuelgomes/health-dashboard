const express = require("express");
const router = express.Router();
const {
  testConnectionController,
} = require("../controller/testConnectionController");

/**
  @route   GET api/testConnection
  @desc    Returns the status of the connection to the database
  @access  Public
  @produces application/json

  @responses
    200:
      status - string - Status of the response.
      message - string - Message of the response.
        example: "Connected to database"
    500:
      status - string - Status of the response in case of an error.
      message - string - Message describing the error.
        example: "Internal Server Error"
*/

router.get("/testConnection", testConnectionController);

module.exports = router;
