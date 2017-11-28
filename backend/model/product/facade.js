const Facade = require('../../lib/facade');
const productSchema = require('./schema');

class ProductFacade extends Facade {
  addProduct(company) {
    return this.create(company)
  }
}

module.exports = new ProductFacade(productSchema);
