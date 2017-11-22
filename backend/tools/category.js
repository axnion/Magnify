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

exports.listTest = function() {
  const catStack = new dataStructures.Stack();
  let layer = 0;

  function promiseWhile(predicate, action) {
    function loop() {
      if (!predicate) return;
      return Promise.resolve(action()).then(loop);
    }
    return Promise.resolve().then(loop);
  }
  
  const addAllMainCategoriesToStackfunction = function () {
    return categoryFacade.findAllMainCategories()
    .then((mainCategories) => {
      return Promise.all(mainCategories.map((mainCategory) => {
        console.log(JSON.stringify(mainCategory.name, null, 0));
        catStack.push(mainCategory);
      }));
    });
  };

  addAllMainCategoriesToStackfunction()
  .then(promiseWhile(catStack.empty(), function() {
    let nextToProcess = catStack.pop();
    layer += 2;
    console.log(JSON.stringify(nextToProcess.name, null, layer));
    return categoryFacade.findAllChildrenOf(nextToProcess.name)
    .then(allChildren => Promise.all(allChildren.map((child) => {
      return catStack.push(child);
    })));
  }))
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
