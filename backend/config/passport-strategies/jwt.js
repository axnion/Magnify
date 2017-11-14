const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Account = require('../../model/account/schema');

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = new Strategy(options, (jwtPayload, done) => {
  Account.findOne({ _id: jwtPayload.sub }, (err, user) => {
    if (err) return done(err, false);

    if (user) return done(null, user);

    return done(null, false);
  });
});
