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

// Please don't try to understand this function (you have better things to do with your life) /Henrik
exports.list = function() {
  const catStack = new dataStructures.Stack();
  let layer = 0;
  const nrOfChildren = [];

  // Generic while promise function
  function promiseWhile(predicate, action) {
    function loop() {
      if (!predicate()) return;
      return Promise.resolve(action()).then(loop);
    }
    return Promise.resolve().then(loop);
  }
  
  categoryFacade.findAllMainCategories()
    .then((mainCategories) => {
      return Promise.all(mainCategories.map((mainCategory) => {
        catStack.push(mainCategory);
        return mainCategory;
      }));
    })
  .then(() => promiseWhile(function() { return !catStack.isEmpty(); }, function() {
    let nextToProcess = catStack.pop();
    let asString = nextToProcess.name;
    let i;
    for (i = 0; i < layer * 2; i += 1) {
      asString = ' ' + asString;
    }
    console.log(asString);
    return categoryFacade.findAllChildrenOf(nextToProcess)
    .then((allChildren) => {
      nrOfChildren[layer] -= 1;
      if (allChildren.length === 0 && layer > 0) {
        while (nrOfChildren[layer] === 0) {
          layer -= 1;
        }
      } else if (allChildren.length !== 0) {
        layer += 1;
        nrOfChildren[layer] = allChildren.length;
      }
      return Promise.all(allChildren.map((child) => {
        catStack.push(child);
        return child;
      })).then(() => {
        return Promise.resolve();
      });
    });
  }))
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
