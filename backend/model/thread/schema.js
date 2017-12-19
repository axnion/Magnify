const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'post'
      }
    ],
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'account',
      required: true
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'product'
    }
  },
  {
    timestamps: true
  }
);

let thread;

// Used for testing to make sure model is not already in database
try {
  thread = mongoose.model('thread');
} catch (error) {
  thread = mongoose.model('thread', threadSchema);
}

module.exports = thread;
