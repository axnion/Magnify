const passport = require('passport');
const config = require('../../config');
const Controller = require('../../lib/controller');
const AnnotationsFacade = require('./facade');
const ProductFacade = require('../product/facade');
class AnnotationController extends Controller {
  create(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user) return res.status(401).json({ message: 'Not authorized' });

      return AnnotationsFacade.findOne({
        material: req.body.material,
        account: user.id
      })
        .then(response => {
          if (response === null) {
            return AnnotationsFacade.createAnnotation(req.body, user.id).then(
              doc => res.status(201).json(doc)
            );
          } else {
            return AnnotationsFacade.updateAnnotation(
              req.body,
              user.id,
              response._id
            ).then(doc => res.status(204).json(doc));
          }
        })
        .catch(err => res.status(500).json(err));
      /* return AnnotationsFacade.createAnnotation(req.body)
        .then(doc => res.status(201).json(doc))
        .catch(err => next(err)); */
    })(req, res, next);
  }
  findByAccount(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user) return res.status(401).json({ message: 'Not authorized' });

      return ProductFacade.findById(req.params.id)
        .then(resp => {
          // return AnnotationsFacade.find();
        })
        .then(resp => res.status(200).json(resp))
        .catch(err => next(err));
    })(req, res, next);
  }

  findAllAnnotationsByAccount(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user) return res.status(401).json({ message: 'Not authorized' });

      return this.facade
        .findAllAnnotationsByAccount(user.id)
        .then(collection => res.status(200).json(collection))
        .catch(err => next(err));
    })(req, res, next);
  }
}

module.exports = new AnnotationController(AnnotationsFacade);
