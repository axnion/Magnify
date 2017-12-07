
const annotationFacade = require('../model/annotation/facade');
const mongoose      = require('mongoose');
const Promise       = require('bluebird');

exports.list = function() {
  annotationFacade.find()
  .then((results) => {
    results.forEach((account) => {
      console.log(JSON.stringify(account, null, 4));
    });
  })
  .finally(() => {
    mongoose.connection.close();
  });
};


/**
* Function to delete the accounts collection. Destroying all data of accounts
* in the database.
*/
exports.drop = function(connection) {
  const promise = new Promise((resolve, reject) => {
    connection.dropCollection('annotations', (err, result) => {
      if (err) reject(err);
      else {
        console.log('Annotationscollection dropped');
        resolve(result);
      }
    });
  });

  promise.finally(() => {
    mongoose.connection.close();
  });

  return promise;
};