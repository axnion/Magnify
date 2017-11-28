const Controller = require('../../lib/controller');
const ProductFacade = require('./facade');

class ProductController extends Controller {
  getProducts(req, res, next) {
    return ProductFacade.find().then(resp => res.status(200).json(resp));
  }
}

module.exports = new ProductController(ProductFacade);
