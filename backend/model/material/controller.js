const Controller = require('../../lib/controller');
const materialFacade = require('./facade');
const productFacade = require('../product/facade');
const passport = require('passport');
const config = require('../../config');

class MaterialController extends Controller {

  upload(req, res, next) {

    // Check authorization
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (
        !user ||
        (user.role !== config.accountRole.companyRep &&
         user.role !== config.accountRole.companyAdmin)
      ) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      // Check if company rep is associated with the company responsible for the product
      productFacade.findById(req.body.productId)
        .then((product) => {
          if (!user.company.equals(product.company)) {
            return res.status(401).json({ message: 'Not authorized' });
          }

          return this.facade.save(req.file, req.body.title, req.body.description, req.body.productId)
            .then(resp => res.status(201).json({ message: 'File saved' }))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })(req, res, next);
  }

  getMaterialFile(req, res, next) {
    return this.facade.getMaterialFile(req.params.id)
      .then((file) => {
        res.contentType('application/pdf');
        res.setHeader('Content-disposition', `attachment; filename=${file.name}`);
        file.stream.pipe(res.status(200));
      })
      .catch(err => next(err));
  }
}

module.exports = new MaterialController(materialFacade);
