const controller = require('./controller');
const uploadMiddleWare = require('../helpers').uploadMiddleWare;
const Router = require('express').Router;
const router = new Router();

router.route('/upload')
  .post(uploadMiddleWare(), (...args) => controller.upload(...args));

router.route('/:id')
  .get((...args) => controller.findById(...args));

router.route('/:id/download')
  .get((...args) => controller.getMaterialFile(...args));

router.route('/:id/rating')
  .put((...args) => controller.setRating(...args))
  .get((...args) => controller.getRating(...args));

module.exports = router;
