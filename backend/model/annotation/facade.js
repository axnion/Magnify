const Facade = require('../../lib/facade');
const AnnotationSchema = require('./schema');

class AnnotationFacade extends Facade {}

module.exports = new AnnotationFacade(AnnotationSchema);
