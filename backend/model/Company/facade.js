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
  getCompanyByAccount(account){
    return getCompanyById(account.company);
  }


}

module.exports = new CompanyFacade('Company', companySchema);
