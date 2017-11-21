const Facade = require("../../lib/facade");
const ConsumerSchema = require("./schema");

class ConsumerFacade extends Facade {
  createAccount(body, company) {
    const schema = new this.Schema({
      username: body.username,
      password: body.password,
      role: body.role,
      company
    });
    return schema.save();
  }
}

module.exports = new ConsumerFacade(ConsumerSchema);
