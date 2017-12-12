const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'account',
    required: true
  }
}, {
  timestamps: true
});

let post;

// Used for testing to make sure model is not already in database
try {
  post = mongoose.model('post');
} catch (error) {
  post = mongoose.model('post', postSchema);
}

module.exports = post;
