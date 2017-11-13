const Facade = require('../../lib/facade');
const AccountSchema = require('./schema');

class AccountFacade extends Facade {
	addAccount(account){
		this.create(account);
	};
}

module.exports = new AccountFacade(AccountSchema);
