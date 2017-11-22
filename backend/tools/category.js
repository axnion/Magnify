// Required schema import on this line
const mongoose = require('mongoose');
const categoryFacade = require('../model/category/facade');
const Promise       = require('bluebird');

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
/*
Private rekursive function for printing all categories in layer order
*/
const recursiveCategoryPrint = function(parent, layer) {
  if (!parent) {
    return (null);
  } else {

    console.log(JSON.stringify(parent.name, null, layer));
    
  return Promise.resolve().then(() => {
    return categoryFacade.findAllChildrenOf(parent).then((children) => {
      return Promise.all(children.map((child) => {
        return recursiveCategoryPrint(child, layer + 2 );
      }));
    });
  });
}
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
 
  categoryFacade.find()
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
