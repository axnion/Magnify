const Facade = require('../../lib/facade');
const companySchema = require('./schema');

class CompanyFacade extends Facade {

  getCompanyByName(name){
		return findOne({name:name});
	}

  getCompanyById(id){
		return findById(id);
	}

  //is this something we want?
  // Axel: No, this should be handled on the Account sice in that case
  getCompanyByAccount(account){
    return getCompanyById(account.company);
  }

  addCompany(company) {
    return this.create(company)
  }
}

module.exports = new CompanyFacade(companySchema);
