const express = require("express");
const router = express.Router();
const { uniqueCidsController } = require("../controller/uniqueCidsController");
/**
  @route   GET api/uniqueCids
  @desc    Returns all unique cids.
  @access  Public
  @produces application/json

  @responses
    200: 
      status - string - Status of the response.
      data - array - array of unique cids.
        example:
        {
            status: "success",
            data: ["F607","F062","G432"]
        }
        
    500:
      status - string - Status of the response in case of an error.
      message - string - Message describing the error.
        example: "Internal Server Error"
*/

router.get("/uniqueCids", (req, res) => uniqueCidsController(req, res));

module.exports = router;
