const companyFacade = require("../model/company/facade");
const mongoose = require("mongoose");

exports.list = function() {
  companyFacade.find()
  .then(function(results) {
    results.forEach(function(company) {
      console.log(JSON.stringify(company, null, 4))
    })
  })
  .finally(function() {
    mongoose.connection.close()
  })
}
