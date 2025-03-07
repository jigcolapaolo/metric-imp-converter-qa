const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('?input=10L', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=10L')
          .end(function (err, res) {
            assert.equal(res.status, 200, 'Response status should be 200');
            assert.deepEqual(res.body, {
                "initNum": 10,
                "initUnit": "L",
                "returnNum": 2.64172,
                "returnUnit": "gal",
                "string": "10 liters converts to 2.64172 gallons"
            });
            done();
          });
    });

    test('?input=32g', (done) => {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=32g')
        .end((err, res) => {
          assert.strictEqual(res.body, "invalid unit")
          done()
        })
    })

    test('?input=3/7.2/4kg', (done) => {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kg')
        .end((err, res) => {
          assert.strictEqual(res.body, "invalid number")
          done()
        })
    })

    test('?input=3/7.2/4kilomegagram', (done) => {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res) => {
          assert.strictEqual(res.body, "invalid number and unit")
          done()
        })
    })

    test('kg', (done) => {
      chai
        .request(server)
        .keepOpen()
        .get('/api/convert?input=kg')
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.deepEqual(res.body, {
            "initNum": 1,
            "initUnit": "kg",
            "returnNum": 2.20462,
            "returnUnit": "lbs",
            "string": "1 kilograms converts to 2.20462 pounds"
          })
          done()
        })
    })
});
