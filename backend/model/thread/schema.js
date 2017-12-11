const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  posts: [{
    type: mongoose.Schema.ObjectId,
    ref: 'post'
  }],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'account',
    required: true
  }
  // tags: [{ type: mongoose.Schema.ObjectId, ref: 'Tag' }]
});

// Adds createdAt and updatedAt automatically
threadSchema.plugin(timestamps);

let thread;

// Used for testing to make sure model is not already in database
try {
  thread = mongoose.model('thread');
} catch (error) {
  thread = mongoose.model('thread', threadSchema);
}

module.exports = thread;
