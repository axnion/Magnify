const passport = require('passport');
const Controller = require('../../lib/controller');
const companyFacade = require('./facade');
const config = require('../../config');

class CompanyController extends Controller {
  getProducts(req, res, next) {
    // Check authorization
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user || user.role !== config.userRole.companyAdmin) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      // TODO: implement fetch of products. Needs DB model for this
      // →  Get { objs } where $company === $this.company
      return res.status(200).json({ message: 'ok' });
    })(req, res, next);
  }
}

module.exports = new CompanyController(companyFacade);
