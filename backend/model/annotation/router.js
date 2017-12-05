const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/').post((...args) => controller.create(...args));
<<<<<<< HEAD
router.route('/:annotationId').get((...args) => controller.findById(...args));
=======
router.route('/:materialId').get((...args) => controller.findById(...args));
router.route('/').get((...args) => controller.findAllAnnotationsByAccount(...args));
>>>>>>> 683603459806316d6023ca7407ef0e7fe0c3652c

module.exports = router;
