const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.getThreads(...args))
  .post((...args) => controller.createThread(...args));

router.route('/:id')
  .get((...args) => controller.getThread(...args));

module.exports = router;
