const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/').post((...args) => controller.create(...args));
router.route('/:materialId').get((...args) => controller.findById(...args));

module.exports = router;