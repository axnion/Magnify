const Facade = require('../../lib/facade');
const threadSchema = require('../thread/schema');
const postSchema = require('./schema');

class PostFacade extends Facade {
  findThreadByIdAndInsertPost(threadId, post) {    
    return threadSchema.findOneAndUpdate(
      { _id: threadId },
      { $push: { posts: post } }
    )
    .then(() => (
      this.Schema
      .findById(post.id)
      .populate({
        path: 'author',
        select: 'username company role',
        populate: { path: 'company' }
      })
    ))
    .then(populatedPost => (
      populatedPost
    ));
  }
}

module.exports = new PostFacade(postSchema);
