const productFacade = require('../model/product/facade');
const companyFacade = require('../model/company/facade');
const categoryFacade = require('../model/category/facade');
const mongoose = require('mongoose');
const Promise       = require('bluebird');

exports.create = function(name, company, maincategory, subcategory) {
  categoryFacade.findOne({ name: maincategory, mainCategory: true })
  .then((mainCat) => {
    return categoryFacade.findOne({ name: subcategory, parent: mainCat.id });
  })
  .then((category) => {
    return companyFacade.findOne({ name: company })
    .then(results => productFacade.create({
      name,
      company: results.id,
      category: category.id
    }))
    .then((product) => {
      console.log('Created product: ');
      console.log(JSON.stringify(product, null, 4));
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => mongoose.connection.close());
};

/**
* Lists all products in the database
*/
exports.list = function() {
  productFacade.find()
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
* Function to delete the products collection. Destroying all data of products
* in the database.
*/
exports.drop = function(connection) {
  const promise = new Promise((resolve, reject) => {
    connection.dropCollection('products', (err, result) => {
      if (err) reject(err);
      else {
        console.log('Products collection dropped');
        resolve(result);
      }
    });
  });

  promise.finally(() => {
    mongoose.connection.close();
  });

  return promise;
};
