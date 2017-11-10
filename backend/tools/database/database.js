const config = require('../../config.js')
const mongoose = require('mongoose')
const Company = require('./schemas/Company')
const Account = require('./schemas/Account')

mongoose.connect(config.mongo.url)
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

exports.getCompanyByName = function(name) {
  return Company.findOne({name: name}).exec();
}

exports.addAccount = function(username, password, admin, company) {
  const account = Account({
    username: username,
    password: password,
    admin: admin,
    company: company
  })

  account.save(function(err) {
    if (err) throw err
    console.log('Account ' + username + ' was created')
  })
}
