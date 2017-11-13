const Controller = require('../../lib/controller');
const CompanyRepresentativeFacade = require('./facade');

class CompanyRepresentativeController extends Controller {
	
	/*
	req: body: representative to add in format:{username: "name", password: "pass", admin: false, company: [{name: "companyName"}]
	res: 201 successfull, 
	*/
	
	createRepresentative(req, res, next){

		//Check authorization. Is this done here?
		
		
		var representativeToCreate = req.body;
				
		//Check if company exists
		//Return error if not exists
		
		//Check admin false
		//Set false otherwise
		//Assumes only one company admin acceptable (already created when company created)
		
		//Add representative to database
		 CompanyRepresentativeFacade.create(req.body)		
			.then(CompanyRepresentativeFacade.find(req.body))
			.then(resp => res.status(201).json(resp))
			.catch(err => console.log("Error occured in function createRepresentative /model/CompanyRepresentative/controller: " + err));
	}
	
	
}

module.exports = new CompanyRepresentativeController(CompanyRepresentativeFacade);
