const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const companySchema = new Schema({
  name: { type: String, required: true, unique: true },
  unseenThreads: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Thread'
    }
  ]
});

let company;

// Used for testing to make sure model is not already in database
try {
  company = mongoose.model('Company');
} catch (error) {
  company = mongoose.model('Company', companySchema);
}

module.exports = company;
