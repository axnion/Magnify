const Facade = require('../../lib/facade');
const threadSchema = require('../thread/schema');
const postSchema = require('./schema');

class PostFacade extends Facade {
  // TODO: improve
  findThreadByIdAndInsertPost(threadId, post) {
    return threadSchema.findOneAndUpdate(
      { _id: threadId },
      { $push: { posts: post } }
    ).then(() => ({
      post
    }));
  }
}

module.exports = new PostFacade(postSchema);
