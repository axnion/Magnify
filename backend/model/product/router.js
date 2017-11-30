const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router
  .route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router
  .route('/:id')
  .get((...args) => controller.findById(...args));

router
  .route('/:id/material')
  .post(controller.uploadMiddleware(), (...args) => controller.uploadMaterial(...args));

module.exports = router;
