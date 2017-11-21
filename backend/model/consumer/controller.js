const passport = require("passport");
const Controller = require("../../lib/controller");
const ConsumerFacade = require("./facade");
const generateJWTToken = require("../helpers").generateJWTToken;

class ConsumerController extends Controller {
  /*
  req: body
  res: 201 successful
  */

  createAccount(req, res, next) {
    // TODO: validate input - here or in facade?
    return ConsumerFacade.createAccount(req.body, null)
      .then(resp => res.status(201).json({ username: resp.username }))
      .catch(err => next(err));
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
    passport.authenticate("local", { session: false }, (err, user, info) => {
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

module.exports = new ConsumerController(ConsumerFacade);
