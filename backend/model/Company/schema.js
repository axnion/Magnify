const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const companySchema = new Schema({
  name: { type: String, required: true, unique: true }
});

//module.exports =  companySchema;

var companies = mongoose.model('company', companySchema);

module.exports = companies;
