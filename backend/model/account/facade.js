const Facade = require('../../lib/facade');
const AccountSchema = require('./schema');
const CompanySchema = require('../company/schema');
const CompanyFacade = require('../company/facade');

class AccountFacade extends Facade {
	createAccount(body, company){
				
		const schema = new this.Schema({
			username: body.username,
			password: body.password,
			admin: body.admin,
			company: company
			});
		return schema.save();
		};
			
}

module.exports = new AccountFacade(AccountSchema);
