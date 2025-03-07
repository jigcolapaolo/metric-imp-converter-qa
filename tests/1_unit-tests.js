const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("convertHandler should correctly read a whole number input.", () => {
        assert.strictEqual(convertHandler.getNum("5kg"), 5)
    })

    test("convertHandler should correctly read a decimal number input.", () => {
        assert.strictEqual(convertHandler.getNum("5.2km"), 5.2)
    })

    test("convertHandler should correctly read a fractional input.", () => {
        assert.strictEqual(convertHandler.getNum("1/2kg"), 0.5)
    })

    test("convertHandler should correctly read a fractional input with a decimal.", () => {
        assert.strictEqual(convertHandler.getNum("2.5/5lbs"), 0.5)
    })

    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
        assert.isNull(convertHandler.getNum("3/2/3km"))
    })

    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
        assert.strictEqual(convertHandler.getNum("km"), 1)
    })

    test("convertHandler should correctly read each valid input unit.", () => {
        assert.strictEqual(convertHandler.getNum("4gal"), 4)
        assert.strictEqual(convertHandler.getNum("1/2km"), 0.5)
        assert.strictEqual(convertHandler.getNum("5.4/3lbs"), 1.8)
        assert.strictEqual(convertHandler.getNum("kg"), 1)
    })

    test("convertHandler should correctly return an error for an invalid input unit.", () => {
        assert.isNull(convertHandler.getUnit("1kt"))
    })

    test("convertHandler should return the correct return unit for each valid input unit.", () => {
        assert.strictEqual(convertHandler.getUnit("4gal"), "gal")
        assert.strictEqual(convertHandler.getUnit("1/2km"), "km")
        assert.strictEqual(convertHandler.getUnit("5.4/3lbs"), "lbs")
        assert.strictEqual(convertHandler.getUnit("kg"), "kg")
    })

    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
        assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons")
        assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds")
        assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles")
        assert.strictEqual(convertHandler.spellOutUnit("L"), "liters")
        assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms")
        assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers")
    })

    test("convertHandler should correctly convert gal to L.", () => {
        assert.strictEqual(convertHandler.convert(2, "gal"), 7.57082)
    })

    test("convertHandler should correctly convert L to gal.", () => {
        assert.strictEqual(convertHandler.convert(7.57082, "L"), 2)
    })

    test("convertHandler should correctly convert mi to km.", () => {
        assert.strictEqual(convertHandler.convert(3.1, "mi"), 4.98895)
    })

    test("convertHandler should correctly convert km to mi.", () => {
        assert.strictEqual(convertHandler.convert(4.98895, "km"), 3.1)
    })

    test("convertHandler should correctly convert lbs to kg.", () => {
        assert.strictEqual(convertHandler.convert(5, "lbs"), 2.26796)
    })

    test("convertHandler should correctly convert kg to lbs.", () => {
        assert.strictEqual(convertHandler.convert(2.26796, "kg"), 5)
    })
});