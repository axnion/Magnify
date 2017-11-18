const request = require("supertest");
const server = require("../index");
const Account = require("../model/account/schema");

/**
 * As of now, for this test to run, an admin user account needs to exist. 
 * This can be created by entering the tools directory and running 
 * node app.js account -C -c Awesome -u admin -p pass -a 
 * 
 * Note that there is no functionality for deleting users in the system (that I know of).
 */

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
