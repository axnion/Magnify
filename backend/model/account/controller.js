const passport = require('passport');
const Controller = require('../../lib/controller');
const AccountFacade = require('./facade');
const generateJWTToken = require('../helpers').generateJWTToken;

class AccountController extends Controller {

  /*
  req: body
  res: 201 successful
  */

  /*
    The request must be structured in this format:

    Headers:
      Content-Type: application/json
      Authentication: Bearer ${jwtToken}

    Body:
      { "username": "user", "password": "pass", "admin": "false", "company": "5a0afb68e85c280848adc49d" }

    NOTE: The JWT Token is retrieved from the login route, /accounts/login. The company must be in ObjectID format and
    it must be an ObjectID of a company that exists (will throw an error otherwise).
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

  /*
    The request must be structured in this format:

    Headers:
      Content-Type: application/x-www-form-urlencoded

    Body:
      username: username
      password: password

    The response will look kind of like this:

    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
          "username": "username",
          "id": "5a0afb68e85c280848adc49e",
          "admin": true
      }
    }

    Copy the accessToken to use in the createAccount route. Make sure you login with an admin user or
    you will not be able to create new accounts!
  */

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
