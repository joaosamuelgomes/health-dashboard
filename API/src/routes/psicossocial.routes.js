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
          status: "success",
          data: {
            data: [{
              dt_atend: string,
              ufmun: string,
              idadepac: string,
              sexopac: string,
              cd_desc: string,
            }],
            somaCids: [{
              name: string,
              gendercounts: {
                M: number,
                F: number,
              },
              agecounts: {
                "0-10": number,
                "11-20": number,
                "21-30": number,
                "31-40": number,
                "41-50": number,
                "51-60": number,
                "61-70": number,
                "71-80": number,
                "81-90": number,
                "91-100": number,
              },
            }]
          },
          filtros: {
            time_range: string,
            cid: string,
            age: string,
            sex: string,
          }
        }
        
    500:
      status - string - Status of the response in case of an error.
      message - string - Message describing the error.
        example: "Internal Server Error"
*/

router.get("/psicossocial", (req, res) => psicossocialController(req, res));

module.exports = router;
