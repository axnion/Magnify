const Controller = require('../../lib/controller');
const categoryFacade = require('./facade');

class CategoryController extends Controller {

    /**
     * Returns all main categories if query = onlyMains
     * else returns all categories
     */
  findCategories(req, res, next) {
    if (req.query.mains) {
      return this.facade.findAllMainCategories()
        .then(collection => res.status(200).json(collection))
        .catch(err => next(err));
    }
    return this.facade.find()
      .then(collection => res.status(200).json(collection))
      .catch(err => next(err));
  }

    /**
    * Returns all children to req.body
    */
  findAllChildrenOf(req, res, next) {
    return this.facade.findAllChildrenOfById(req.params.id)
        .then(collection => res.status(200).json(collection))
        .catch(err => next(err));
  }

}

module.exports = new CategoryController(categoryFacade);
