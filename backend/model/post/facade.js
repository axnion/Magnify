const Facade = require('../../lib/facade');
const threadSchema = require('../thread/schema');
const companySchema = require('../company/schema');
const postSchema = require('./schema');

class PostFacade extends Facade {
  // TODO: improve
  findThreadByIdAndInsertPost(threadId, post) {    
    return threadSchema.findOneAndUpdate(
      { _id: threadId },
      { $push: { posts: post } }
    )
    .then(() => (
      postSchema
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
