const server = require("../index.js");
const Example = require("../model/example/schema");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("Example", () => {
  beforeEach(done => {
    Example.remove({}, err => {
      done();
    });
  });

  describe("/GET example", () => {
    it("should GET all Examples", done => {
      chai
        .request(server)
        .get("/example")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST Example", () => {
    it("should post an Example", done => {
      const example = new Example({ title: "title" });
      chai
        .request(server)
        .post("/example")
        .send(example)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });

    it.skip("should not POST faulty example object", done => {
      const example = new Example();

      chai
        .request(server)
        .post("/example")
        .send(example)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("#find example", () => {
    it("should find a specific example", done => {
      const example = new Example({ title: "Special" });
      example.save((err, example) => {
        chai
          .request(server)
          .get("/example/" + example.id)
          .send(example)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("title");
            res.body.should.have.property("_id").eql(example.id);
            done();
          });
      });
    });
  });
});
