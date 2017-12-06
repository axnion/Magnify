const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/').put((...args) => controller.create(...args));
router
  .route('/:materialId')
  .get((...args) => controller.findAnnotation(...args));
router
  .route('/')
  .get((...args) => controller.findAllAnnotationsByAccount(...args));

router
  .route('/product/:productId')
  .get((...args) => controller.findByAccount(...args));

module.exports = router;
