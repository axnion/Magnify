const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const config = require('../../config')
const Schema = mongoose.Schema;
const companySchema = require("../company/schema")


const accountSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	admin: {type: Boolean, required: true},
	company: {type: mongoose.Schema.ObjectId, ref: 'Company',required: true}
});

/**
* Create hash of password when it is changed before saving to database.
*/
accountSchema.pre('save', function(next) {
	let account = this;

	// Skip if password has not changed
	if (!account.isModified('password')) return next()

	// Generate salt
	bcrypt.genSalt(config.saltFactor, function(err, salt) {
		if (err) return next(err)

		// Hash password
		bcrypt.hash(account.password, salt, function(err, hash) {
			if (err) return next(err)
			account.password = hash
			next()
		})
	})
})

/**
* Comparason method for comparing a candidate password to the saved hash
*/
accountSchema.methods.comparePassword = function(candidate, callback) {
	bcrypt.compare(candidate, this.password, function(err, isMatch) {
		if (err) return callback(err)
		callback(null, isMatch)
	})
}

var accounts

//Used for testing to make sure model is not already in database
try {
	accounts = mongoose.model('account')
}catch (error)
{
	accounts = mongoose.model('account', accountSchema);
}

module.exports = accounts;
