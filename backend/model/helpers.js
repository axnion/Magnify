const jwt = require('jsonwebtoken');
const jwtExpiry = require('../config').jwtExpiry;

exports.generateJWTToken = (user) => {
  const u = {
    sub: user.id,
    username: user.username,
    role: user.role,
    company: user.company
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: jwtExpiry
  });
};
