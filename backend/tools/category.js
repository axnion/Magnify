// Required schema import on this line
const mongoose = require('mongoose');
const categoryFacade = require('../model/category/facade');

exports.createCategory = function(name, parent) {

  if (parent)    {
    console.log(parent);
    // Check if parent in database
    categoryFacade.findOne({ name: parent })
    .then((result) => {
      console.log(JSON.stringify(result, null, 4));
            
      return new Promise((resolve, reject) => {
        if (result) {
          resolve(result);
        } else {
          reject(`No category matching parent "${parent}" was found to add as parent`);
        }
      });
    })
    .then(result => categoryFacade.createCategory(name, result))
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

  } else {
    categoryFacade.createCategory(name, parent).finally(() => {
      mongoose.connection.close();
    });
  }


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
