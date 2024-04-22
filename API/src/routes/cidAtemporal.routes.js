const express = require("express");
const router = express.Router();
const {
    cidAtemporalController,
} = require("../controller/cidAtemporalController");

router.get("/cidAtemporal", (req, res) => cidAtemporalController(req, res));

/**
  @route   GET api/cidAtemporal
  @desc    Returns atemporal data based on specified parameters.
  @access  Public
  @produces application/json

  @params
    - name: time_range
      type: string
      required: false
      description: Time range of the data (format: YYYYMM-YYYYMM).
      example: "202206-202304"
    - name: cid
      type: string
      required: false
      description: CID of the data.
      example: "F20"

  @responses
    200: 
      status - string - Status of the response.
      data - object - objects of cid atemporal data.
        example: 
        {
            status: "success",
            data: [
                yearmonth: string,
                ocorrencias: string
            ],
            filtros: {
                time_range: string,
                cid: string
            }
        }
        
    500:
      status - string - Status of the response in case of an error.
      message - string - Message describing the error.
        example: "Internal Server Error"
*/

module.exports = router;
