const Facade = require('../../lib/facade');
const threadSchema = require('./schema');
const companySchema = require('../company/schema');
const productSchema = require('../product/schema');

class ThreadFacade extends Facade {
  findByIdPopulateAuthor(id) {
    return this.Schema.findById(id).populate('author');
  }

  findByIdPopulateAuthorAndPosts(id) {
    return this.Schema.findById(id)
      .populate({
        path: 'author',
        select: 'username company role',
        populate: { path: 'company' }
      })
      .populate({
        path: 'posts',
        populate: {
          path: 'author',
          select: 'username company role',
          populate: { path: 'company' }
        }
      })
      .populate({
        path: 'product',
        select: 'company name',
        populate: {
          path: 'company'
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
      .populate({ path: 'product', populate: { path: 'company' } })
      .populate('posts');
  }

  removeFromUnseenThreads(companyId, threadId) {
    return companySchema.update(
      { _id: companyId },
      { $pull: { unseenThreads: threadId } }
    ).exec();
  }

  addToUnseenThreads(productId, threadId) {
    productSchema.findById(productId).then((product) => {
      companySchema.update(
        { _id: product.company },
        { $push: { unseenThreads: threadId } }
      ).exec();
    });
  }
}

module.exports = new ThreadFacade(threadSchema);
