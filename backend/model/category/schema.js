const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required() { return !this.mainCategory; }
    },
    mainCategory: { type: Boolean, required: true }
  });

let category;

try {
  category = mongoose.model('Category');
} catch (error) {
  category = mongoose.model('Category', categorySchema);
}

module.exports = category;
