const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

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
  },
  material: [
    {
      url: {
        type: String,
        required: true,
        unique: true
      },
      title: {
        type: String
      },
      description: {
        type: String
      }
    }
  ]
});

productSchema.plugin(idValidator);

let products;

// Used for testing to make sure model is not already in database
try {
  products = mongoose.model('product');
} catch (error) {
  products = mongoose.model('product', productSchema);
}

module.exports = products;
