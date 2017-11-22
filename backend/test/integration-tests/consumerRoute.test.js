const request = require("supertest");
const server = require("../../index");
//const Consumer = require("../../model/consumer/schema");
const Account = require("../../model/account/schema");
//const ConsumerFacade = require("../../model/consumer/facade");
const AccountFacade = require("../../model/account/facade");
beforeAll(() => {
  AccountFacade.createAccount({
    username: "tester",
    password: "123secure",
    role: "consumer"
  });
});

// Remove consumers created by running tests
afterAll(done => {
  Account.remove({}, err => {
    if (err) done(err);
    done();
  });
});

describe("Creating consumer", () => {
  test("create consumer with minimal set of credentials", done => {
    const authAttempt = request.agent(server);
    authAttempt
      .post("/account/consumer")
      .set("Content-Type", "application/json")
      .send({
        username: "Minimal",
        password: "123",
        role: "consumer"
      })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(201);
        done();
      });
  });

  test("Fail to create a duplicate consumer", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/account/consumer")
      .set("Content-Type", "application/json")
      .send({
        username: "tester",
        password: "123secure",
        role: "consumer"
      })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(500);
        done();
      });
  });

  test("create consumer using all schema properties", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/account/consumer")
      .set("Content-Type", "application/json")
      .send({
        username: "AwesomeUser",
        password: "pass",
        role: "consumer",
        admin: false,
        company: null
      })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(201);
        done();
      });
  });

  test("Fail to create new consumer when only passing username", done => {
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

  test("Fail to create consumer when NOT posting role", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/account/consumer")
      .set("Content-Type", "application/json")
      .send({ username: "Dodo", password: "didi" })
      .end((err, resp) => {
        expect(resp.statusCode).toEqual(500);
        done();
      });
  });
});
describe("Test login", () => {
  test("Login existing user", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/account/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        username: "tester",
        password: "123secure",
        role: "consumer"
      })
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
      .send({
        username: "AwesomeUser2",
        password: "pass",
        role: "consumer",
        admin: false
      })
      .then(resp => {
        authAttempt
          .post("/account/login")
          .set("Content-Type", "application/x-www-form-urlencoded")
          .send({
            username: "AwesomeUser2",
            password: "pass",
            role: "consumer",
            admin: false
          })
          .end((err, response) => {
            if (err) {
              console.log("An error ocurred");
            }
            expect(response.statusCode).toEqual(200);
            done();
          });
      });
  });
});
