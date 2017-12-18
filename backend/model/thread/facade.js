const Facade = require('../../lib/facade');
const threadSchema = require('./schema');

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
      .populate('author')
      .populate('product');
  }
}

module.exports = new ThreadFacade(threadSchema);
