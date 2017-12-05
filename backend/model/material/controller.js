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

          return this.facade.save(req.file, req.body)
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

  setRating(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user || user.role !== config.accountRole.consumer) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const material = req.params.id;
      const account = user.id;
      const rating = req.body.rating;

      return materialFacade.findByIdAndUpdate(
        material,
        { $addToSet: { ratings: { account, rating } } },
        { upsert: true }
      )
      .then((result) => {
        res.status(200).json(result);
        next();
      });
    })(req, res, next);
  }

  getRating(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user || user.role === config.accountRole.consumer) {

        this.facade.findById(req.params.id).then((material) => {
          const numberOfRatings = material.ratings.length;
          let sumOfRatings = 0;
          let consumerRating = undefined;

          material.ratings.forEach((rating) => {
            sumOfRatings += rating.rating;
            if (rating.account.equals(user.id)) {
              consumerRating = rating.rating;
            }
          });

          const response = {
            consumerRating,
            avgRating: parseFloat((sumOfRatings / numberOfRatings).toFixed(1)),
            nrRates: numberOfRatings
          };

          return res.status(200).json(response);
        })
      .catch(err => next(err));
      }
    })(req, res, next);
  }
}

module.exports = new MaterialController(materialFacade);
