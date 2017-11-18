const request = require("supertest");
const server = require("../index");
const Account = require("../model/account/schema");
const Company = require('../model/company/schema');
const AccountFacade = require('../model/account/facade');
const CompanyFacade = require('../model/company/facade');

// NOTE: mongodb must be running (it already is if you're developing on Vagrant)

// Creates a single admin user to test the account route. Runs once before all the tests.
beforeAll(() => (
  CompanyFacade.addCompany({ name: 'TestCompany' })
    .then(company => (AccountFacade.createAccount({ username: 'admin', password: 'pass', admin: true }, company.id)))
  )
);

// Removes all accounts and companies in the test database. Runs once after all the tests.
afterAll((done) => {
  Account.remove({}, (err) => {
    if (err) done(err);

    Company.remove({}, (err) => {
      if (err) done(err);

      done();
    });
  });
});

describe("Test /account route", () => {
  test("login using correct credentials", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/account/login")
      .send({ username: "admin", password: "pass" })
      .end(function(err, response) {
        expect(response.statusCode).toEqual(200);
        done();
      });
  });

  test("Login using non-existing user", done => {
    const authAttempt = request.agent(server);

    authAttempt
      .post("/account/login")
      .send({ username: "foo", password: "bar" })
      .end(function(err, response) {
        expect(response.statusCode).toEqual(401);
        done();
      });
  });

  test("create a user", done => {
    const authAttempt = request.agent(server);

    return authAttempt
      .post("/account/login")
      .send({ username: "admin", password: "pass" })
      .then(response => {
        authAttempt
          .post("/account")
          .set("Content-Type", "application/json")
          .set("Authorization", "Bearer " + response.body.accessToken)
          .send({ username: "AwesomeUser3", password: "pass", admin: false })
          .end((err, resp) => {
            expect(resp.statusCode).toEqual(201);
            done();
          });
      });
  });
});
