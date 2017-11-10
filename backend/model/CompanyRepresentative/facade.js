const Facade = require('../../lib/facade');
const CompanyRepresentativeSchema = require('./schema');

class CompanyRepresentativeFacade extends Facade {
	
	getCompany(company){
		return findOne({name:company});
	}
	
	//getCompanyAdmin(companyRepresentative);
	
	//getCompanyRepresentative(companyRepresenative);
	
	addNewCompanyRepresentative(companyRepresenatative){
		console.log(companyRepresenatative);
		this.create(companyRepresenatative);
	};
	
}

module.exports = new CompanyRepresentativeFacade(CompanyRepresentativeSchema);
