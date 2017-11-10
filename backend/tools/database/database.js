const config = require('../../config.js')
const mongoose = require('mongoose')
const Company = require('./schemas/Company')

mongoose.connect(config.mongo.url)

exports.addCompany = function(name) {
  const company = Company({
    name: name
  })

  company.save(function(err) {
    if (err) throw err

    console.log('Company ' + name + "was created")
  })
}
