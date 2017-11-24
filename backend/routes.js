const Router = require('express').Router;
const router = new Router();

const account = require('./model/account/router');
const company = require('./model/company/router');
const category = require('./model/category/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to backend API!' });
});

router.use('/account', account);
router.use('/company', company);
router.use('/category', category);

module.exports = router;
