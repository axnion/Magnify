const Facade = require('../../lib/facade');
const AnnotationSchema = require('./schema');

class AnnotationFacade extends Facade {
  createAnnotation(body, account) {
    const schema = new this.Schema({
      material: body.material,
      account,
      annotation: body.annotation
    });

    return schema.save();
  }
  updateAnnotation(body, account, annotationId) {
    const obj = {
      material: body.material,
      account,
      annotation: body.annotation
    };

    return this.Schema.findByIdAndUpdate(annotationId, obj).exec();
  }
  findAllAnnotationsByAccount(accountId) {
    return this.Schema.find({ account: accountId }).exec();
  }
}

module.exports = new AnnotationFacade(AnnotationSchema);
