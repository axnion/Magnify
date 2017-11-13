const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companySchema = require("../Company/schema")

const representativeSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: {type: Boolean, required: true},
	company: {type: mongoose.Schema.ObjectId, ref: 'Company',required: true}
});

var representatives = mongoose.model('companyRepresentative', representativeSchema);

module.exports = representatives;
