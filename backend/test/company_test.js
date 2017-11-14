/* eslint-disable */
const server = require("../index.js");
const Company = require("../model/company/schema");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Company", () => {
  beforeEach(done => {
    Company.remove({}, err => {
      done();
    });
  });

  describe("/GET company", () => {
    it("Should GET all companies", done => {
      chai
        .request(server)
        .get("/company")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
