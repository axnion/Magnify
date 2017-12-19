const Controller = require('../../lib/controller');
const CompanyFacade = require('./facade');

class CompanyController extends Controller {
//  getProducts() {
//    return CompanyFacade.getProducts();
//  }

  findCompanyById(req, res, next) {
    return this.facade.getCompanyById(req.params.id)
    .then((result) => {
      result.unseenThreads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      res.status(200).json(result);
      next();
    })
    .catch((err) => {
      next(err);
    });
  }
}

module.exports = new CompanyController(CompanyFacade);
