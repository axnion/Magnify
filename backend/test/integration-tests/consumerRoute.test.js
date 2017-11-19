const request = require("supertest");
const server = require("../../index");
const Consumer = require("../../model/consumer/schema");
const ConsumerFacade = require("../../model/consumer/facade");

// Remove consumers created by running tests
afterAll(done => {
  Consumer.remove({}, err => {
    if (err) done(err);
    done();
  });
});

describe("Creating consumer", () => {
  test("create a new consumer", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/consumer")
      .set("Content-Type", "application/json")
      .send({ username: "AwesomeUser", password: "pass" })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(201);
        done();
      });
  });

  test("fail to create new consumer when passing fauly params", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/consumer")
      .set("Content-Type", "application/json")
      .send({ username: "Foo" })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(500);
        done();
      });
  });
});
