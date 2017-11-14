const passport = require('passport');
const Controller = require('../../lib/controller');
const AccountFacade = require('./facade');
const generateJWTToken = require('../helpers').generateJWTToken;

class AccountController extends Controller {

  /*
  req: body: representative to add in format:
    {username: "name", password: "pass", admin: false, company: [{name: "companyName"}]
  res: 201 successfull,
  */

  createAccount(req, res, next) {

    // Check authorization. Is this done here? Yes!
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user || user.admin === false) return res.status(401).json({ message: 'Not authorized' });

      return AccountFacade.create(req.body)
        .then(resp => res.status(201).json(resp))
        .catch(err => next(err));
    })(req, res, next);

    /* const newAccount = req.body;

    // Check if company exists
    // Return error if not exists

    // Check admin false
    // Return error if not false
    // Assumes only one company admin acceptable (already created when company created)

    // Add representative to database
    AccountFacade.create(newAccount)
      .then(resp => res.status(201).json(resp))
      .catch(err => next(err)); */
  }

  login(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      return res.status(200).json({
        accessToken: generateJWTToken(user),
        user: {
          username: user.username,
          id: user.id,
          admin: user.admin
        }
      });
    })(req, res, next);
  }
}

module.exports = new AccountController(AccountFacade);
