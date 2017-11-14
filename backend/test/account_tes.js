/* eslint-disable */
const server = require("../index.js");
const CR = require("../model/account/schema");
const companyFacade = require("../model/company/facade");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

describe("Accounts", () => {
  beforeEach(done => {
    CR.remove({}, err => {
    });
	//Adds two companies to database to make it able to add accounts 
	companyFacade.addCompany({ name: "Company1" });
	companyFacade.addCompany({ name: "Company2" });
	
  });

  describe("/GET", () => {
    it("should GET all accounts", done => {
      chai
        .request(server)
        .get("/account")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST", () => {
    it.skip("should post an account", done => {
      const representative = new CR({
        username: "Henrik",
        password: "1234",
        admin: false,
        company: [{ name: "Awesome" }]
      });
      chai
        .request(server)
        .post("/account")
        .send(representative)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("username");
          res.body.should.have.property("password");
          res.body.should.have.property("admin");
          res.body.should.have.property("company");
          res.body.username.should.equal("Henrik");
          res.body.password.should.equal("1234");
          res.body.admin.should.equal(false);
          done();
        });
    });

    it.skip("duplicate username POST should result in error", done => {
      var rep1 = new CR({
        username: "myName",
        password: "1234",
        admin: false,
        company: [{ name: "Awesome" }]
      });
      var rep2 = new CR({
        username: "myName",
        password: "12345",
        admin: false,
        company: [{ name: "Awesome2" }]
      });

      chai
        .request(server)
        .post("/account")
        .send(rep1)
        .end((err, res) => {
          res.should.have.status(201);

          chai
            .request(server)
            .post("/account")
            .send(rep2)
            .end((err, res) => {
              res.should.have.status(500);
              done();
            });
        });
    });

    it.skip("should not POST faulty account object", done => {
      const badRepresentative = new CR({
        username: "Henrik",
        password: "1234",
        admin: false
      });

      chai
        .request(server)
        .post("/account")
        .send(badRepresentative)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
