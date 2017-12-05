const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/').post((...args) => controller.create(...args));
router.route('/:materialId').get((...args) => controller.findById(...args));
router.route('/').get((...args) => controller.findAllAnnotationsByAccount(...args));

module.exports = router;
