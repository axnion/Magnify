const Strategy = require('passport-local').Strategy;
const Account = require('../../model/account/schema');

module.exports = new Strategy((username, password, done) => {
  Account.findOne({ username }, (err, user) => {
    if (!user) return done(null, false, { message: `Username ${username} not found` });
    return user.comparePassword(password, (error, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }

      return done(null, false, { message: 'Invalid username or password' });
    });
  });
});
