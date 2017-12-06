const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/').put((...args) => controller.create(...args));
router.route('/').get((...args) => controller.find(...args));
router
  .route('/')
  .get((...args) => controller.findAllAnnotationsByAccount(...args));

module.exports = router;
