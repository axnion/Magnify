const Facade = require('../../lib/facade');
const companySchema = require('./schema');

class CompanyFacade extends Facade {
// getCompanyByName(name) {
//    return this.findOne({ name });
//  }

  getCompanyById(id) {
    return this.Schema.findById(id)
    .populate({
      path: 'unseenThreads',
      populate: {
        path: 'author',
        select: 'username company role',
        populate: { path: 'company' }
      }
    })
    .populate({
      path: 'unseenThreads',
      populate: {
        path: 'product',
        populate: {
          path: 'company',
          select: 'name'
        }
      }
    });
  }

//  addCompany(company) {
//    return this.create(company);
//  }
}

module.exports = new CompanyFacade(companySchema);
