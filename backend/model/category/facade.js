const Facade = require('../../lib/facade');
const categorySchema = require('./schema');

class CategoryFacade extends Facade {

  createCategory(name, parent)    {
    if (parent) {
      const schema = new this.Schema({
        name,
        mainCategory: false,
        parent
      });
      return schema.save();
    } else {
      const schema = new this.Schema({
        name,
        mainCategory: true
      });
      return schema.save();
    }
  }

}

module.exports = new CategoryFacade(categorySchema);