const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/upload')
  .post(controller.uploadMiddleware(), (...args) => controller.upload(...args));

router.route('/:id')
  .get((...args) => controller.getMaterialById(...args));

router.route('/:id/download')
  .get((...args) => controller.getMaterialFile(...args));

module.exports = router;
