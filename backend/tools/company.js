const companyFacade = require('../model/company/facade');
const mongoose = require('mongoose');
const Promise       = require('bluebird');

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

/**
* Function to delete the companies collection. Destroying all data of companies
* in the database.
*/
exports.drop = function(connection) {
  const promise = new Promise((resolve, reject) => {
    connection.dropCollection('companies', (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

  promise.finally(() => {
    mongoose.connection.close();
  });

  return promise;
};
