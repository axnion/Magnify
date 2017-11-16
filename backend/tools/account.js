const companyFacade = require('../model/company/facade');
const accountFacade = require('../model/account/facade');
const mongoose = require('mongoose');

/**
* Create new account.
*/
exports.createAccount = function(username, password, company, admin) {
  companyFacade.findOne({ name: company })
  .then((results) => {
    if (!results && admin) {
      console.log(`Company ${company} does not exist... creating it now`);
      return companyFacade.create({ name: company });
    }
    return new Promise((resolve, reject) => {
      if (results) {
        resolve(results);
      } else {
        reject(`No company matchin "${company}" was found to add this user to`);
      }
    });

  })
  .then(company => accountFacade.create({
    username,
    password,
    admin,
    company: company.id
  }))
  .then((account) => {
    console.log('Created Account: ');
    console.log(JSON.stringify(account, null, 4));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
};

exports.list = function() {
  accountFacade.find()
  .then((results) => {
    results.forEach((account) => {
      console.log(JSON.stringify(account, null, 4));
    });
  })
  .finally(() => {
    mongoose.connection.close();
  });
};
