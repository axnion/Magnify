const Facade = require('../../lib/facade');
const AnnotationSchema = require('./schema');

class AnnotationFacade extends Facade {
  createAnnotation(body) {
    const schema = new this.Schema({
      account: body.account,
      annotation: body.annotation
    });

    return schema.save();
  }

  findAllAnnotationsByAccount(accountId) {
    return this.Schema
      .find({ account: accountId })
      .exec();
  }

}

module.exports = new AnnotationFacade(AnnotationSchema);
