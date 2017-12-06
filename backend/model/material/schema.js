const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  file: {
    id: {
      type: mongoose.Schema.ObjectId
    },
    name: {
      type: String
    }
  },
  ratings: [{
    _id: false,
    account: {
      type: mongoose.Schema.ObjectId,
      ref: 'Account'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }]
});

let material;

try {
  material = mongoose.model('Material');
} catch (error) {
  material = mongoose.model('Material', materialSchema);
}

module.exports = material;