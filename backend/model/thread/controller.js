const passport = require('passport');
const Controller = require('../../lib/controller');
const threadFacade = require('./facade');

class ThreadController extends Controller {
  createThread(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      console.log('Called CT');
      if (err) return res.status(500).json({ message: info });

      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const thread = req.body;
      thread.author = user.id;

      return this.facade
        .create(thread)
        .then(createdThread => {
          // return this.facade.findByIdPopulateAuthor(createdThread.id); replaced by →
          return this.facade.findByIdPopulateAuthorAndProduct(createdThread.id);
        })
        .then(result => {
          res.status(201).json(result);
          next();
        })
        .catch(err => {
          next(err);
        });
    })(req, res, next);
  }

  getThread(req, res, next) {
    return this.facade
      .findByIdPopulateAuthorAndPosts(req.params.id)
      .then(thread => {
        thread.posts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        res.status(200).json(thread);
        next();
      });
  }

  getThreads(req, res, next) {
    return this.facade.findAndPopulateAuthorAndProduct().then(threads => {
      threads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.status(200).json(threads);
      next();
    });
  }
}

module.exports = new ThreadController(threadFacade);
