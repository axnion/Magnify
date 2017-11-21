const passport = require('passport');
const Controller = require('../../lib/controller');
const CompanyRepFacade = require('./facade');
const config = require('../../config');

class CompanyRepController extends Controller {

  createAccount(req, res, next) {
    // Check authorization
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user || user.role !== config.userRole.companyAdmin) return res.status(401).json({ message: 'Not authorized' });

      return CompanyRepFacade.createAccount(req.body, user.company)
        .then(resp => res.status(201).json({ username: resp.username }))
        .catch(err => next(err));
    })(req, res, next);
  }
}

module.exports = new CompanyRepController(CompanyRepFacade);
