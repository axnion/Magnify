const Facade = require('../../lib/facade');
const companySchema = require('./schema');

class CompanyFacade extends Facade {
// getCompanyByName(name) {
//    return this.findOne({ name });
//  }

  getCompanyById(id) {
    return this.Schema.findById(id).populate('unseenThreads');
  }

//  addCompany(company) {
//    return this.create(company);
//  }
}

module.exports = new CompanyFacade(companySchema);
