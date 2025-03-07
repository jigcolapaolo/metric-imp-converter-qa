'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const { input } = req.query

    try {
      if (!input) throw new Error("invalid input")
        
      const initNum = convertHandler.getNum(input)
      const initUnit = convertHandler.getUnit(input)

      if (!initNum && !initUnit) throw new Error("invalid number and unit")
        else if (!initNum) throw new Error("invalid number")
        else if (!initUnit) throw new Error("invalid unit")

      const returnNum = convertHandler.convert(initNum, initUnit)
      const returnUnit = convertHandler.getReturnUnit(initUnit)
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
  
      res.json({
        "initNum": initNum,
        "initUnit": initUnit,
        "returnNum": returnNum,
        "returnUnit": returnUnit,
        "string": string,
      })
    } catch (error) {
      res.json(error.message)
    }

  })

};
