// Required schema import on this line
const mongoose = require('mongoose');
const categoryFacade = require('../model/category/facade');

exports.createCategory = function(name, parent) {
  // Check if parent in database
  categoryFacade.findOne({ name: parent })
    .then(results => new Promise((resolve, reject) => {
      console.log(parent);
      if (results) {
        resolve(results);
      } else {
        reject(`No category matching parent "${parent}" was found to add as parent`);
      }
    })
    )
    .then(results => categoryFacade.createCategory(name, results))
    .then((category) => {
      console.log('Category created: ');
      console.log(JSON.stringify(category, null, 4));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
};


exports.createMainCategory = function(name) {
  categoryFacade.createCategory(name, null)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
};

exports.list = function() {
  categoryFacade.find().then((results) => {
    results.forEach((category) => {
      console.log(JSON.stringify(category, null, 4));
    });

  }).finally(() => {
    mongoose.connection.close();
  });
    // 1 Loop through categories
        // 2 List main categories
            // 3 Loop through children
                // 4 List child category
                // repeat 3 and 4 untill no children
        // 5 finally - close database
};
