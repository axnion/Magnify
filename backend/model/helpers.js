const jwt = require('jsonwebtoken');
const jwtExpiry = require('../config').jwtExpiry;

exports.generateJWTToken = (user) => {
  const u = {
    sub: user.id,
    username: user.username,
    admin: user.admin
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: jwtExpiry
  });
};