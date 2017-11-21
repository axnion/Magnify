const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const Schema = mongoose.Schema;

const consumerSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required() {
      return this.role === "companyAdmin" || this.role === "companyRep";
    }
  },
  role: {
    type: String,
    required: true,
    enum: ["companyAdmin", "companyRep", "consumer"]
  }
});

/**
* Create hash of password when it is changed before saving to database.
*/
consumerSchema.pre("save", function(next) {
  const consumer = this;

  // Skip if password has not changed
  if (!consumer.isModified("password")) return next();

  // Generate salt
  bcrypt.genSalt(config.saltFactor, (err, salt) => {
    if (err) return next(err);

    // Hash password
    bcrypt.hash(consumer.password, salt, (err, hash) => {
      if (err) return next(err);
      consumer.password = hash;
      next();
    });
  });
});

/**
* Comparason method for comparing a candidate password to the saved hash
*/
consumerSchema.methods.comparePassword = function(candidate, callback) {
  bcrypt.compare(candidate, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

let consumers;

// Used for testing to make sure model is not already in database
try {
  consumers = mongoose.model("consumer");
} catch (error) {
  consumers = mongoose.model("consumer", consumerSchema);
}

module.exports = consumers;
