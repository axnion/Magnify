const Facade = require('../../lib/facade');
const materialSchema = require('./schema');
const productSchema = require('../product/schema');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

class MaterialFacade extends Facade {

  save(file, title, description, productId) {

    const material = new this.Schema({
      title: title,
      description: description,
      url: `/material/${file.id}/download`
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

    return new Promise((resolve, reject) => {
      resolve(gfs.createReadStream({
        _id: materialId
      }));
    });
  }
}

module.exports = new MaterialFacade(materialSchema);