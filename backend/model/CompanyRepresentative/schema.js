const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const companySchema = new Schema({
	name: {type: String, required: true, unique: true}
});

const representativeSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: {type: Boolean, required: true},
	company: [companySchema]
});

var representatives = mongoose.model('companyRepresentative', representativeSchema);

module.exports = representatives;

