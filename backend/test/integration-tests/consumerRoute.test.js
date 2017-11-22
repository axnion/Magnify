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
      .post("/account/consumer")
      .set("Content-Type", "application/json")
      .send({ username: "AwesomeUser", password: "pass", role: "consumer" })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(201);
        done();
      });
  });

  test("fail to create new consumer when passing fauly params", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/account/consumer")
      .set("Content-Type", "application/json")
      .send({ username: "Foo" })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(500);
        done();
      });
  });

  test("Login existing user", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/account/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ username: "AwesomeUser", password: "pass" })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(200);
        done();
      });
  });

  test("Login using promise version of test", done => {
    const authAttempt = request.agent(server);

    return authAttempt
      .post("/account/consumer")
      .set("Content-Type", "application/json")
      .send({ username: "AwesomeUser2", password: "pass", role: "consumer" })
      .then(resp => {
        authAttempt
          .post("/account/login")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .send({ username: "AwesomeUser2", password: "pass" })
          .end((err, response) => {
            if (err) {
              console.log(err);
            }

            expect(response.statusCode).toEqual(200);
            done();
          });
      });
  });
});
