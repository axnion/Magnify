const Controller = require('../../lib/controller');
const threadFacade = require('./facade');

class ThreadController extends Controller {}

module.exports = new ThreadController(threadFacade);
