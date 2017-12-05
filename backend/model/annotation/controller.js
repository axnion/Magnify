const passport = require('passport');
const config = require('../../config');
const Controller = require('../../lib/controller');
const AnnotationsFacade = require('./facade');

class AnnotationController extends Controller {
  create(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user) return res.status(401).json({ message: 'Not authorized' });

      return AnnotationsFacade.createAnnotation(req.body)
        .then(doc => res.status(201).json(doc))
        .catch(err => next(err));
    })(req, res, next);
  }

  findAllAnnotationsByAccount(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user) return res.status(401).json({ message: 'Not authorized' });

      return this.facade.findAllAnnotationsByAccount(user.id)
    .then(collection => res.status(200).json(collection))
    .catch(err => next(err));
    })(req, res, next);
  }
}

module.exports = new AnnotationController(AnnotationsFacade);
