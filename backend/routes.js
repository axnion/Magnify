const Router = require('express').Router;
const router = new Router();

const account = require('./model/account/router');
const company = require('./model/company/router');
const category = require('./model/category/router');
const product = require('./model/product/router');
const annotation = require('./model/annotation/router');
const material = require('./model/material/router');
const thread = require('./model/thread/router');
const post = require('./model/post/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to backend API!' });
});

router.use('/account', account);
router.use('/company', company);
router.use('/category', category);
router.use('/product', product);
router.use('/annotation', annotation);
router.use('/material', material);
router.use('/thread', thread);
router.use('/post', post);

module.exports = router;
