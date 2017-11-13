const server = require("../index.js");
const CR = require("../model/CompanyRepresentative/schema");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

describe("Representative", () => {
  beforeEach(done => {
    CR.remove({}, err => {
      done();
    });
  });

  describe("/GET", () => {
    it("should GET all representatives", done => {
      chai
        .request(server)
        .get("/CompanyRepresentative")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
