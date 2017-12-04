const passport = require('passport');
const Controller = require('../../lib/controller');
const ProductFacade = require('./facade');
const config = require('../../config');

class ProductController extends Controller {
  create(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (
        !user ||
        (user.role !== config.accountRole.companyRep &&
          user.role !== config.accountRole.companyAdmin)
      ) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const newProduct = req.body;
      newProduct.company = user.company;

      if (newProduct.category === '') {
        delete newProduct.category;
      }

      return this.facade
        .create(newProduct)
        .then(doc => res.status(201).json(doc))
        .catch(err => next(err));
    })(req, res, next);
  }

  findById(req, res, next) {
    return this.facade
    .findById(req.params.id)
    .then(resp => res.status(201).json(resp))
    .catch(err => next(err));
  }

  find(req, res, next) {
    return this.facade
    .find()
    .then(resp => res.status(201).json(resp))
    .catch(err => next(err));
  }
}

module.exports = new ProductController(ProductFacade);
