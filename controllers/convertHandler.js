function ConvertHandler() {

  const UNITS = {
    GAL: {
      SM: "gal",
      LG: "gallons",
      INVERT: "L"
    },
    LBS: {
      SM: "lbs",
      LG: "pounds",
      INVERT: "kg"
    },
    MI: {
      SM: "mi",
      LG: "miles",
      INVERT: "km"
    },
    L: {
      SM: "L",
      LG: "liters",
      INVERT: "gal"
    },
    KG: {
      SM: "kg",
      LG: "kilograms",
      INVERT: "lbs"
    },
    KM: {
      SM: "km",
      LG: "kilometers",
      INVERT: "mi"
    }
  }

  const inputRegex = /^([\d.\/]+)?([a-zA-Z]+)$/
  
  this.getNum = function(input) {
    let result;

    const match = input.match(inputRegex);
    if (!match) return null

    const number = match[1] ? match[1] : "1";

    if (number.includes("/")) {

      const parts = number.split("/")
      if (parts.length !== 2) return null

      const [num, den] = number.split("/").map(Number)

      if (den === 0) return null

      result = num / den
    } else {
      result = Number(number)
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    const match = input.match(inputRegex);
    if (!match || !match[2]) return null

    result = Object.values(UNITS).find(i => i.SM.toLowerCase() === match[2].toLowerCase())

    if (!result) return null

    return result.SM;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = Object.values(UNITS).find(i => i.SM === initUnit).INVERT;
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = Object.values(UNITS).find(i => i.SM === unit).LG;
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;

    switch (initUnit.toLowerCase()) {
      case UNITS.GAL.SM:
        result = initNum * galToL
        break;
      case UNITS.LBS.SM:
        result = initNum * lbsToKg
        break;
      case UNITS.MI.SM:
        result = initNum * miToKm
        break;
      case UNITS.L.SM.toLowerCase():
        result = initNum / galToL
        break;
      case UNITS.KG.SM:
        result = initNum / lbsToKg
        break;
      case UNITS.KM.SM:
        result = initNum / miToKm
        break;
      default:
        throw new Error("invalid unit " + initUnit)
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
