const Facade = require('../../lib/facade');
const categorySchema = require('./schema');

class CategoryFacade extends Facade {

  /*
  Adds a category to the database, parent argument = null => main category

  Pre: parent in database or null
  Arguments:
    name: name of new category
    parent: name of parent or null if main category is to be created
  Post: New category added to database
  */

  createCategory(name, parent)    {
    if (parent) {
      return this.findOne({ name: parent })
      .then((result) => {
        if (result) {
          const schema = new this.Schema({
            name,
            mainCategory: false,
            parent: result
          });
          return schema.save();
        }

        throw new Error('Parent not found in database');
      });
    }
    const schema = new this.Schema({
      name,
      mainCategory: true
    });
    return schema.save();

  }
  /*
  Returns an array of all non-child categories
  */
  findAllMainCategories() {
    return this.Schema
    .find({ mainCategory: true })
    .exec();
  }
  /*
  Returns an array of all children to parent
  Arguments
    parent: parent name as string
  */
  findAllChildrenOf(parent) {
    return this.findOne({ name: parent }).then((result) => {
      return this.Schema
      .find({ mainCategory: false, parent: result })
      .exec();
    });
  }

}

module.exports = new CategoryFacade(categorySchema);
