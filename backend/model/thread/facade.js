const Facade = require('../../lib/facade');
const threadSchema = require('./schema');
const companySchema = require('../company/schema');
const productSchema = require('../product/schema');
const accountSchema = require('../account/schema');

class ThreadFacade extends Facade {
  findByIdPopulateAuthor(id) {
    return this.Schema.findById(id).populate('author');
  }

  findByIdPopulateAuthorAndPosts(id) {
    return this.Schema.findById(id)
      .populate({
        path: 'author',
        select: 'username company role',
        populate: { path: 'company', model: 'Company' }
      })
      .populate({
        path: 'posts',
        populate: {
          path: 'author',
          select: 'username company role',
          populate: { path: 'company', model: 'Company' }
        }
      })
      .populate({
        path: 'product',
        select: 'company name',
        populate: {
          path: 'company',
          model: 'Company'
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
      .populate({ path: 'author', select: 'username company role', populate: { path: 'company', model: 'Company' } } )
      .populate({ path: 'product', populate: { path: 'company', model: 'Company' } })
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
        { $addToSet: { unseenThreads: threadId } }
      ).exec();
    });
  }

  addToActiveThreads(userId, threadId) {
    accountSchema.update(
      { _id: userId },
      { $addToSet: { activeThreads: threadId } }
    ).exec();
  }
}

module.exports = new ThreadFacade(threadSchema);
