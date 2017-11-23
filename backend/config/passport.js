const local = require("./passport-strategies/local");
const jwt = require("./passport-strategies/jwt");

module.exports = (app, passport) => {
  passport.use(local);
  passport.use(jwt);
};
