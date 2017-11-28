const Facade = require('../../lib/facade');
const productSchema = require('./schema');

class ProductFacade extends Facade {
  addProduct(body, companyId) {
    const schema = new this.Schema({
      name: body.name,
      company: companyId
    });
    return schema.save();
  }
}

module.exports = new ProductFacade(productSchema);
