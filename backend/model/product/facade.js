const Facade = require('../../lib/facade');
const productSchema = require('./schema');

class ProductFacade extends Facade {

  saveMaterial(productId, material) {

    return this.Schema.findOneAndUpdate(
      { _id: productId },
      { $push: { material: material } },
      { new: true }
    );
  }
}

module.exports = new ProductFacade(productSchema);
