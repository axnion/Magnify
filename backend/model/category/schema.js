const mongoose = require('mongoose');
const categoryFacade = require('./facade');
const Schema = mongoose.Schema;

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
  const account = this;

  categoryFacade.find().then(() => {console.log("lol")})

//   categoryFacade.find({ name: account.name, parent: account.parent })
//   .then((results) => {
//     if (results) {
//       console.log('SAME!');
//     } else {
//       console.log('NOT SAME!');
//     }
//   });
});

let category;
try {
  category = mongoose.model('Category');
} catch (error) {
  category = mongoose.model('Category', categorySchema);
}

module.exports = category;
