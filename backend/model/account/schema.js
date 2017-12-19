const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const Schema = mongoose.Schema;
const Company = require('../company/schema');

const accountSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required() {
      return this.role === config.accountRole.companyAdmin ||
        this.role === config.accountRole.companyRep;
    }
  },
  role: {
    type: String,
    required: true,
    enum: ['companyAdmin', 'companyRep', 'consumer']
  },
  activeThreads: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Thread'
  }]
});

/**
* Create hash of password when it is changed before saving to database.
*/
accountSchema.pre('save', function(next) {
  const account = this;

  // Skip if password has not changed
  if (!account.isModified('password')) return next();

  // Generate salt
  bcrypt.genSalt(config.saltFactor, (err, salt) => {
    if (err) return next(err);

    // Hash password
    bcrypt.hash(account.password, salt, (err, hash) => {
      if (err) return next(err);
      account.password = hash;
      next();
    });
  });
});

// Check if company exists
accountSchema.pre('save', function(next) {
  const account = this;

  // Skip if company has not changed
  if (!account.company || !account.isModified('company')) return next();

  Company.findOne({ _id: account.company }, (err, company) => {
    if (err) return next(err);
    if (!company) return next(new Error(`Company with ID ${account.company} not found.`));

    next();
  });
});

/**
* Comparason method for comparing a candidate password to the saved hash
*/
accountSchema.methods.comparePassword = function(candidate, callback) {
  bcrypt.compare(candidate, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

let accounts;

// Used for testing to make sure model is not already in database
try {
  accounts = mongoose.model('account');
} catch (error) {
  accounts = mongoose.model('account', accountSchema);
}

module.exports = accounts;
