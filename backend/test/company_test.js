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

    it("Should GET a specific company", done => {
      const company = new Company({
        name: "Awesome corp"
      });

      chai
        .request(server)
        .post("/company")
        .send(company)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.name.should.equal("Awesome corp");
          done();
        });
    });
  });

  describe("POST company", () => {
    it("Should save a newly created company", done => {
      const company = new Company({
        name: "Awesome corp"
      });

      chai
        .request(server)
        .post("/company")
        .send(company)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Should not create duplicate companies", done => {
      const companyA = new Company({
        name: "Awesome corp"
      });

      const companyB = new Company({
        name: "Awesome corp"
      });

      chai
        .request(server)
        .post("/company")
        .send(companyA)
        .end((err, res) => {
          res.should.have.status(201);
          chai
            .request(server)
            .post("/company")
            .send(companyB)
            .end((err, res) => {
              res.should.have.status(500);
              done();
            });
        });
    });
  });
});
