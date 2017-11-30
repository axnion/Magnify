const Facade = require('../../lib/facade');
const productSchema = require('./schema');
const Grid = require('gridfs-stream');

class ProductFacade extends Facade {
  saveMaterial(productId, material) {
    return this.Schema.findOneAndUpdate(
      { _id: productId },
      { $push: { material: material } },
      { new: true }
    );
  }

  getMaterialFile(materialId) {
    const gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('material');

    return this.findById(materialId).then(material => {
      const file = {
        stream: gfs.createReadStream({
          _id: material.fileId
        }),
        name: material.filename
      };
      return file;
    });
  }
}

module.exports = new ProductFacade(productSchema);
