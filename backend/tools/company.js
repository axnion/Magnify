const companyFacade = require('../model/company/facade');
const mongoose = require('mongoose');

exports.list = function() {
  companyFacade.find()
  .then((results) => {
    results.forEach((company) => {
      console.log(JSON.stringify(company, null, 4));
    });
  })
  .finally(() => {
    mongoose.connection.close();
  });
};
