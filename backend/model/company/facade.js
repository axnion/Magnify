const Facade = require('../../lib/facade');
const companySchema = require('./schema');

class CompanyFacade extends Facade {
  getCompanyByName(name){
		return findOne({name:name});
	}

  getCompanyById(id){
		return findById(id);
	}

  addCompany(company) {
    return this.create(company)
  }
}

module.exports = new CompanyFacade(companySchema);
