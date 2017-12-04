const Facade = require('../../lib/facade');
const productSchema = require('./schema');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

class ProductFacade extends Facade {
  saveMaterial(productId, material) {
    return this.Schema.findOneAndUpdate(
      { _id: productId },
      { $push: { material: material } },
      { new: true }
    );
  }

  findById(id) {
    return this.Schema.findOne({ _id: id })
      .populate('material');
  }

  getMaterialFile(materialId) {
    const gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('material');

    return new Promise((resolve, reject) => {
      resolve(gfs.createReadStream({
        _id: materialId
      }));
    });
  }
}

module.exports = new ProductFacade(productSchema);
