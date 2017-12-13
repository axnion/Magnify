const postFacade = require('../model/post/facade');
const mongoose      = require('mongoose');
const Promise       = require('bluebird');

exports.list = function() {
  postFacade.find()
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
* Function to delete the posts collection. Destroying all data of accounts
* in the database.
*/
exports.drop = function(connection) {
  const promise = new Promise((resolve, reject) => {
    connection.dropCollection('posts', (err, result) => {
      if (err) reject(err);
      else {
        console.log('Posts collection dropped');
        resolve(result);
      }
    });
  });

  promise.finally(() => {
    mongoose.connection.close();
  });

  return promise;
};