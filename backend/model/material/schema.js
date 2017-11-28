const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  title: { type: String },
  description: { type: String },
  fileId: { type: Schema.Types.ObjectId, ref: 'material.files' },
  filename: { type: String }
});

let material;

try {
  material = mongoose.model('Material');
} catch (error) {
  material = mongoose.model('Material', materialSchema);
}

module.exports = material;
