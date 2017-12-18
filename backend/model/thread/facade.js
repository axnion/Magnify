const Facade = require('../../lib/facade');
const threadSchema = require('./schema');
const companySchema = require('../company/schema');

class ThreadFacade extends Facade {
  findByIdPopulateAuthor(id) {
    return this.Schema.findById(id).populate('author');
  }

  findByIdPopulateAuthorAndPosts(id) {
    return this.Schema.findById(id)
      .populate('posts')
      .populate('author')
      .populate({
        path: 'posts',
        populate: {
          path: 'author',
          model: 'account'
        }
      });
  }

  findByIdPopulateAuthorAndProduct(id) {
    return this.Schema.findById(id)
      .populate('author')
      .populate('product');
  }

  findAndPopulateAuthor() {
    return this.Schema.find().populate('author');
  }

  findAndPopulateAuthorAndProduct() {
    return this.Schema.find()
      .populate({ path: 'author', select: 'username company role', populate: { path: 'company' } } )
      .populate('product')
      .populate('posts');
  }

  removeFromUnseenThreads(companyId, threadId) {
    return companySchema.update(
      { _id: companyId },
      { $pull: { unseenThreads: { _id: threadId } } },
      { upsert: true }
    );
  }
}

module.exports = new ThreadFacade(threadSchema);
