const config = require('../../config.js')
const mongoose = require('mongoose')
const Company = require('./schemas/Company')
const Account = require('./schemas/Account')

mongoose.createConnection(config.mongo.url)
mongoose.Promise = require('bluebird')

exports.addCompany = function(name) {
  const company = Company({
    name: name
  })

  company.save(function(err) {
    if (err) throw err
    console.log('Company \"' + name + '\" was created')
  })
}

getCompanyByName = function(name) {
  return Company.findOne({name: name}).exec();
}

exports.addAccount = function(username, password, admin, companyName) {
  getCompanyByName(companyName).then(function(results) {
    const account = Account({
      username: username,
      password: password,
      admin: admin,
      company: results.id
    }).catch(function(err) {
      console.log(err)
    })

    account.save(function(err) {
      if (err) throw err
      console.log('Account ' + username + ' was created')
    })
  })
}
