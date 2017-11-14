const Facade = require('../../lib/facade');
const AccountSchema = require('./schema');
const CompanySchema = require('../company/schema');
const CompanyFacade = require('../company/facade');

class AccountFacade extends Facade {
	
}

module.exports = new AccountFacade(AccountSchema);
