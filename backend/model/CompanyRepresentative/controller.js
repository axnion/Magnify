const Controller = require('../../lib/controller');
const CompanyRepresentativeFacade = require('./facade');

class CompanyRepresentativeController extends Controller {
	
	/*
	req: body: representative to add in format:{username: "name", password: "pass", admin: false, company: [{name: "companyName"}]
	res: 201 successfull, 
	*/
	
	createRepresentative(req, res, next){
		
		//console.log("createRepresentative in CompanyController");
		
		//var tempObject = {username: "Henrik", password: "1234", admin: false, company: [{name: "Awesome"}]};
		console.log(req.body);		
		
		CompanyRepresentativeFacade.create(req.body)		
			.then(CompanyRepresentativeFacade.find(req.body))
			.then(resp => res.status(201).json(resp))
			.catch(err => console.log("Error occured in function createRepresentative /model/CompanyRepresentative/controller: " + err));
						
		/*this.facade.getCompany(company)
			.then(returnedCompany => console.log("Company is: " + returnedCompany))
			.catch(err => console.log("Error occured: " + err));
		*/
	}
	
	
}

module.exports = new CompanyRepresentativeController(CompanyRepresentativeFacade);
