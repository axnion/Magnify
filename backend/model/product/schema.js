const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const Schema = mongoose.Schema;
const Company = require('../company/schema');
const Category = require('../category/schema');

const productSchema = new Schema({
  name: { type: String, required: true },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  }
});

let products;

// Used for testing to make sure model is not already in database
try {
  products = mongoose.model('product');
} catch (error) {
  products = mongoose.model('product', productSchema);
}

module.exports = products;
