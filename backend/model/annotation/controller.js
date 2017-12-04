const passport = require('passport');
const config = require('../../config');
const Controller = require('../../lib/controller');
const AnnotationsFacade = require('./facade');

class AnnotationController extends Controller {
  create(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user) return res.status(401).json({ message: 'Not authorized' });

      const annotation = req.body;

      return AnnotationsFacade.createAnnotation(req.body)
        .then(doc => res.status(201).json(doc))
        .catch(err => next(err));
    })(req, res, next);
  }
}

module.exports = new AnnotationController(AnnotationsFacade);
