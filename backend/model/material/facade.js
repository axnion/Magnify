const Facade = require('../../lib/facade');
const materialSchema = require('./schema');
const productSchema = require('../product/schema');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

class MaterialFacade extends Facade {

  save(file, title, description, productId) {

    const id = mongoose.Types.ObjectId();

    const material = new this.Schema({
      _id: id,
      title: title,
      description: description,
      fileId: file.id,
      filename: file.originalname,
      url: `/material/${id}/download`
    });

    return material.save().then(() => {
      return productSchema.findOneAndUpdate(
        { _id: productId },
        { $push: { material: material } },
        { new: true }
      );
    });
  }

  getMaterialFile(materialId) {
    const gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('material');

    return this.findById(materialId).then((material) => {
      const file = {
        stream: gfs.createReadStream({
          _id: material.fileId
        }),
        name: material.filename
      };
      return file;
    });
  }

  /* getMaterialFile(materialId) {
    const gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('material');

    return new Promise((resolve, reject) => {
      resolve(gfs.createReadStream({
        _id: materialId
      }));
    });
  } */
}

module.exports = new MaterialFacade(materialSchema);