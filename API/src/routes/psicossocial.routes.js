const express = require("express");
const router = express.Router();
const {
    psicossocialController,
} = require("../controller/psicossocialController");

/**
  @route   GET api/psicossocial
  @desc    Returns psicossocial data based on specified parameters.
  @access  Public
  @produces application/json

  @params
    - name: time_range
      type: string
      required: false
      description: Time range of the data (format: YYYYMM-YYYYMM).
      example: "202206-202304"
    - name: age
      type: string
      required: false
      description: Age range of the data.
      example: "0-50"
    - name: cid
      type: string
      required: false
      description: CID of the data.
      example: "F20"
    - name: sex
      type: string
      required: false
      description: Sex of the patient.
      example: "M" or "F"

  @responses
    200: 
      status - string - Status of the response.
      data - object - objects of psicossocial data.
        example: 
        {
          data: [
            {
              dt_atend: string
              ufmun: string
              idadepac: string
              sexopac: string
              cd_descr: string
            }
          ],
          somaCids: [
            {
              name: string,
              genderCounts: {
                M: number,
                F: number
              },
              total: number
            }
          ],
          filtros: {
            age: string,
          }
        }
        
    500:
      status - string - Status of the response in case of an error.
      message - string - Message describing the error.
        example: "Internal Server Error"
*/

router.get("/psicossocial", (req, res) => psicossocialController(req, res));

module.exports = router;
