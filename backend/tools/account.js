const companyFacade = require("../model/company/facade");
const accountFacade = require("../model/account/facade");
const mongoose = require("mongoose");

/**
* Create new account.
*/
exports.createAccount = function(username, password, company, admin) {
  companyFacade.findOne({ name: company })
  .then(function(results) {
    if(!results && admin) {
      console.log("Company " + company + " does not exist... creating it now")
      return companyFacade.create({ name: company })
    } else {
      return new Promise(function(resolve, reject) {
        if(results) {
          resolve(results)
        } else {
          reject("No company matchin \"" + company + "\" was found to add this user to")
        }
      })
    }
  })
  .then(function(company) {
    return accountFacade.create({
      username: username,
      password: password,
      admin: admin,
      company: company.id
    })
  })
  .then(function(account) {
    console.log("Created Account: ")
    console.log(JSON.stringify(account, null, 4))
  })
  .catch(function(err) {
    console.log(err);
  })
  .finally(function() {
    mongoose.connection.close()
  })
}

exports.list = function() {
  accountFacade.find()
  .then(function(results) {
    results.forEach(function(account) {
      console.log(JSON.stringify(account, null, 4))
    })
  })
  .finally(function() {
    mongoose.connection.close()
  })
}
