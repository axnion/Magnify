const Facade = require('../../lib/facade');
const AnnotationSchema = require('./schema');

class AnnotationFacade extends Facade {
  createAnnotation(body) {
    const schema = new this.Schema({
      material: body.material,
      account: body.account,
      annotation: body.annotation
    });

    return schema.save();
  }
}

module.exports = new AnnotationFacade(AnnotationSchema);
