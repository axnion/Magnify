const passport = require('passport');
const Controller = require('../../lib/controller');
const ProductFacade = require('./facade');
const config = require('../../config');

class ProductController extends Controller {
  create(req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user || (user.role !== config.userRole.companyRep
                && user.role !== config.userRole.companyAdmin)) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const newProduct = req.body;
      newProduct.company = user.company

      return this.facade.create(newProduct)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err));
    })(req, res, next);
  }
}

module.exports = new ProductController(ProductFacade);
