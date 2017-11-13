const Controller = require('../../lib/controller');
const AccountFacade = require('./facade');

class AccountController extends Controller {

	/*
	req: body: representative to add in format:{username: "name", password: "pass", admin: false, company: [{name: "companyName"}]
	res: 201 successfull,
	*/

	createAccount(req, res, next){

		//Check authorization. Is this done here?

		var newAccount = req.body;

		//Check if company exists
		//Return error if not exists

		//Check admin false
		//Return error if not false
		//Assumes only one company admin acceptable (already created when company created)

		//Add representative to database
		 AccountFacade.create(newAccount)
			.then(resp => res.status(201).json(resp))
			.catch(err => next(err));
	}


}

module.exports = new AccountController(AccountFacade);
