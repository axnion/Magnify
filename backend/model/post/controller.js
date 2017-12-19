const passport = require('passport');
const Controller = require('../../lib/controller');
const postFacade = require('./facade');
const threadFacade = require('../thread/facade');

class PostController extends Controller {
  createPost(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const threadId = req.body.threadId;
      const post = req.body;
      post.author = user.id;

      return this.facade
      .create(post)
      .then(createdPost => this.facade.findThreadByIdAndInsertPost(threadId, createdPost))
      .then((result) => {
        threadFacade.addToActiveThreads(user.id, threadId);
        res.status(201).json(result);
        next();
      })
      .catch((err) => {
        next(err);
      });
    })(req, res, next);
  }
}

module.exports = new PostController(postFacade);
