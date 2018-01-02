const Facade = require('../../lib/facade');
const AccountSchema = require('./schema');

class AccountFacade extends Facade {
  createAccount(body, company) {
    const schema = new this.Schema({
      username: body.username,
      password: body.password,
      role: body.role,
      company
    });
    return schema.save();
  }

  findAccountById(id) {
    return this.Schema.findById(id)
      .populate({
        path: 'activeThreads',
        populate: {
          path: 'author product',
          populate: {
            path: 'company',
            select: 'name',
            model: 'Company'
          }
        }
      })
      .populate({
        path: 'selectedProducts',
        populate: {
          path: 'category company'
        }
      });
  }

  addToFavorites(id, product) {
    return this.Schema.findByIdAndUpdate(
      { _id: id },
      { $push: { selectedProducts: product } }
    ).then(() => this.Schema.findById(id).populate('selectedProducts'));
  }
}

module.exports = new AccountFacade(AccountSchema);
