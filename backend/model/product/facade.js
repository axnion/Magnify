const Facade = require('../../lib/facade');
const productSchema = require('./schema');

class ProductFacade extends Facade {

  saveMaterial(productId, material) {

    // TODO: return new product
    return this.Schema.update(
      { _id: productId },
      { $push: { material: material } },
      { new: true }
    );
  }
}

module.exports = new ProductFacade(productSchema);
