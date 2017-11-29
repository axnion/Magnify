const Facade = require('../../lib/facade');
const materialSchema = require('./schema');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

class MaterialFacade extends Facade {

  save(file, title, description) {
    const schema = new this.Schema({
      title: title,
      description: description,
      fileId: file.id,
      filename: file.originalname
    });
    return schema.save();
  }

  getMaterialById(id) {
    return this.findById(id);
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
}

module.exports = new MaterialFacade(materialSchema);
