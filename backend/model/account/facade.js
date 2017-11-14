const Facade = require('../../lib/facade');
const AccountSchema = require('./schema');
const CompanySchema = require('../company/schema');
const CompanyFacade = require('../company/facade');

class AccountFacade extends Facade {
	createAccount(body){
		
		return CompanyFacade.getCompanyByName(body.company).then( comp => {
			if (comp === null){
				throw new Error('Company does not exist');
			}
			const schema = new this.Schema({
			username: body.username,
			password: body.password,
			admin: body.admin,
			company: comp._id
			});
			return schema.save();
		}
		)
		
	};
}

module.exports = new AccountFacade(AccountSchema);
