const passport = require('passport');
const Controller = require('../../lib/controller');
const CompanyFacade = require('./facade');
const config = require('../../config');

class CompanyController extends Controller {
  getProducts() {
    return CompanyFacade.getProducts();
  }
}

module.exports = new CompanyController(CompanyFacade);
