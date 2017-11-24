const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.findCategories(...args));

router.route('/:id')
  .get((...args) => controller.findById(...args));

router.route('/:id/children')
  .get((...args) => controller.findAllChildrenOf(...args));

module.exports = router;
