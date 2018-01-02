const passport = require('passport');
const Controller = require('../../lib/controller');
const AccountFacade = require('./facade');
const generateJWTToken = require('../helpers').generateJWTToken;
const config = require('../../config');

class AccountController extends Controller {
  /**
   * Create new account. Is authenticated by passport
   */
  createAccount(req, res, next) {
    // Check authorization
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user || user.role !== config.accountRole.companyAdmin) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      return this.facade
        .createAccount(req.body, user.company)
        .then(resp => res.status(201).json({ username: resp.username }))
        .catch(err => next(err));
    })(req, res, next);
  }

  /**
   * Login method
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
          role: user.role,
          company: user.company
        }
      });
    })(req, res, next);
  }

  /**
   * Creates a new consumer account
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  createConsumerAccount(req, res, next) {
    req.body.role = config.accountRole.consumer;

    return this.facade
      .createAccount(req.body)
      .then(resp => res.status(201).json({ username: resp.username }))
      .catch(message => res.status(500).json(message));
  }

  getAccount(req, res, next) {
    return this.facade
      .findAccountById(req.params.id)
      .then(result => {
        result.activeThreads.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        res.status(200).json(result);
        next();
      })
      .catch(err => {
        next(err);
      });
  }

  addProduct(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      console.log('Add product was called');
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      const { productId } = req.body;
      return this.facade
        .findOne({
          _id: user.id,
          selectedProducts: productId
        })
        .then(response => {
          if (response === null) {
            return this.facade
              .addToFavorites(user.id, productId)
              .then(result => res.status(201).json(result));
          } else {
            return res.status(200).json(response);
          }
        })
        .catch(err => res.status(500).json(err));
    })(req, res, next);
  }
}

module.exports = new AccountController(AccountFacade);
