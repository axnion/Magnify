// Required schema import on this line
const mongoose = require('mongoose');
const categoryFacade = require('../model/category/facade');

exports.createCategory = function(name, parent) {
    
    categoryFacade.createCategory(name, parent, true);
        console.log("Category created, I hope");
    // 1 Find parent in database
        // 2 if not exist return and print error
        // 3 if is null, set parent to root
        // 4 if exist set as parent
    // 5 Create category
    // 6 Print msg of creation and name on screen
    // 7 catch errors
    // 8 finally - close database


};

exports.list = function() {
    console.log("Am I here?");
    categoryFacade.find().then((results) => {
        results.forEach((category) => { 
            console.log(JSON.stringify(category, null, 4));
        });

    });
    // 1 Loop through categories
        // 2 List main categories
            // 3 Loop through children
                // 4 List child category
                // repeat 3 and 4 untill no children
        // 5 finally - close database
};

/*
accountFacade.find()
  .then((results) => {
    results.forEach((account) => {
      console.log(JSON.stringify(account, null, 4));
    });
  })
  .finally(() => {
    mongoose.connection.close();
  });*/