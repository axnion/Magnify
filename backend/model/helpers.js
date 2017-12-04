const jwt = require('jsonwebtoken');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const mongoUrl = require('../config').mongo.url;
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

exports.uploadMiddleWare = (req) => {
  const gridfs = new GridFsStorage({
    url: mongoUrl,
    file: (req, file) => ({
      filename: file,
      bucketName: 'material'
    })
  });

  return multer({ storage: gridfs }).single('file');
};
