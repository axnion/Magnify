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
  
  describe("/POST", () => {
    it("should post an representative", done => {
      const representative = new CR({username: "Henrik", password: "1234", admin: false, company: [{name: "Awesome"}]});
      chai
        .request(server)
        .post("/CompanyRepresentative")
        .send(representative)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
		  res.body.should.be.a("object");
		  res.body.should.have.property('username');
		  res.body.should.have.property('password');
		  res.body.should.have.property('admin');
		  res.body.should.have.property('company');
		  res.body.username.should.equal('Henrik');
		  res.body.password.should.equal('1234');
		  res.body.admin.should.equal(false);
          done();
        });
    });
	
	it("duplicate username POST should result in error", done => {
		var rep1 = new CR({username: "myName", password: "1234", admin: false, company: [{name: "Awesome"}]});
		var rep2 = new CR({username: "myName", password: "12345", admin: false, company: [{name: "Awesome2"}]});
		
		chai
			.request(server)
			.post("/CompanyRepresentative")
			.send(rep1)
			.send(rep2).end((err, res) => {
				res.should.have.status(500);
				done();
			});
			
	});
		
	it("should not POST faulty representative object", done => {
      const badRepresentative = new CR({username: "Henrik", password: "1234", admin: false});

      chai
        .request(server)
        .post("/CompanyRepresentative")
        .send(badRepresentative)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });		
			
  
});
