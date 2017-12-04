const Facade = require('../../lib/facade');
const productSchema = require('./schema');

class ProductFacade extends Facade {
  findById(id) {
    return this.Schema.findOne({ _id: id })
      .populate('material');
  }

  find() {
    return this.Schema.find()
      .populate('material');
  }
}

module.exports = new ProductFacade(productSchema);
