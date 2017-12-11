const Facade = require('../../lib/facade');
const threadSchema = require('./schema');

class ThreadFacade extends Facade {
  findByIdPopulateAuthor(id) {
    return this.Schema.findById(id).populate('author');
  }
}

module.exports = new ThreadFacade(threadSchema);
