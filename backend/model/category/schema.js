const mongoose = require('mongoose');
const categoryFacade = require('./facade');
const Schema = mongoose.Schema;
const _ = require('lodash')

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    mainCategory: { type: Boolean, required: true },
    parent: { type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required() { return !this.mainCategory; }
    }
  });

categorySchema.pre('save', function(next) {
  category.find({ name: this.name, parent: this.parent })
  .then((results) => {
    if (_.isEmpty(results)) {
      next();
    } else {
      next(new Error(`Category ${this.name} already exists at this level`));
    }
  });
});

let category;
try {
  category = mongoose.model('Category');
} catch (error) {
  category = mongoose.model('Category', categorySchema);
}

module.exports = category;
