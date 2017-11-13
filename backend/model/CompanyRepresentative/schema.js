const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const config = require('../../config')
const Schema = mongoose.Schema;
const companySchema = require("../Company/schema")


const representativeSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: {type: Boolean, required: true},
	company: {type: mongoose.Schema.ObjectId, ref: 'Company',required: true}
});

// Hash password before save
representativeSchema.pre('save', function(next) {
	let account = this;

	// Skip if password has not changed
	if (!account.isModified('password')) return next()

	// Generate salt
	bcrypt.genSalt(config.saltFactor, function(err, salt) {
		if (err) return next(err)

		// Hash password
		bcrypt.hash(account.password, salt, function(err, hash) {
			if (err) return next(err)

			console.log(hash)

			account.password = hash
			next()
		})
	})
})

representatives.methods.comparePassword = function(candidate, callback) {
	bcrypt.compare(candidate, this.password, function(err, isMatch) {
		if (err) return callback(err)
		callback(null, isMatch)
	})
}

var representatives

//Used for testing to make sure model is not already in database
try {
	representatives = mongoose.model('companyRepresentative')
}catch (error)
{
	representatives = mongoose.model('companyRepresentative', representativeSchema);
}

module.exports = representatives;
