const Controller = require('../../lib/controller');
const AnnotationsFacade = require('./facade');

class AnnotationController extends Controller {}

module.exports = new AnnotationController(AnnotationsFacade);
