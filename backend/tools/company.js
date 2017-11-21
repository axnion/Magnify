const companyFacade = require('../model/company/facade');
const mongoose = require('mongoose');

exports.create = function(name) {
  companyFacade.create({ name })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
};

exports.list = function() {
  companyFacade.find()
  .then((results) => {
    results.forEach((company) => {
      console.log(JSON.stringify(company, null, 4));
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
};
