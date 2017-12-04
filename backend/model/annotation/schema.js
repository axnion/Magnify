const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Account = require('../account/schema');

const annotationSchema = new Schema({
  // TODO: implement Material here once it has been refactored
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'account',
    required: true
  },
  annotation: {
    type: String,
    required: true
  }
});

let annotations;

try {
  annotations = mongoose.model('Annotation');
} catch (error) {
  annotations = mongoose.model('Annotation', annotationSchema);
}

module.exports = annotations;
