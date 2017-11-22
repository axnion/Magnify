// Required schema import on this line
const mongoose = require('mongoose');
const categoryFacade = require('../model/category/facade');
const Promise       = require('bluebird');
const dataStructures = require('node-data-structures');

exports.createCategory = function(name, parent) {
  categoryFacade.createCategory(name, parent)
    .then((category) => {
      console.log('Category created: ');
      console.log(JSON.stringify(category, null, 4));
    })
    .catch((err) => {
      console.log(err.message);
      console.log('No category created');
    })
    .finally(() => {
      mongoose.connection.close();
    });
};

exports.createMainCategory = function(name) {
  categoryFacade.createCategory(name, null)
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      mongoose.connection.close();
    });
};

exports.listRec = function() {


  const recursive = recursiveCategoryPrint;
  categoryFacade.findAllMainCategories()
  .then(mainCategories => Promise.all(mainCategories.map((mainCategory) => recursive(mainCategory, 0)
  )))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
};

exports.list = function() {
 
  categoryFacade.findAllChildrenOf('vitvaror')
  .then((categories) => {
    categories.forEach((category) => {
      console.log(JSON.stringify(category.name, null, 2));
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
};

exports.drop = function(connection) {
  const promise = new Promise((resolve, reject) => {
    connection.dropCollection('categories', (err, result) => {
      if (err) reject(err);
      else {
        console.log('Deletion completed: Database has been removed of all categories');
        resolve(result);
      }
    });
  });

  promise.catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });

  return promise;
};
