const Facade = require('../../lib/facade');
const materialSchema = require('./schema');
const productSchema = require('../product/schema');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

class MaterialFacade extends Facade {

  save(file, body) {

    const id = mongoose.Types.ObjectId();

    const material = new this.Schema({
      _id: id,
      title: body.title,
      description: body.description,
      file: {
        id: file.id,
        name: file.originalname
      },
      url: `/material/${id}/download`
    });

    return material.save().then(() => {
      return productSchema.findOneAndUpdate(
        { _id: body.productId },
        { $push: { material } },
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
          _id: material.file.id
        }),
        name: material.file.name
      };
      return file;
    });
  }

  setRating(materialId, accountId, newRating) {
    return this.findById(materialId)
    .then((material) => {
      if (!material) {
        throw new Error('Material not found');
      }

      let isRated = false;

      material.ratings.forEach((rating) => {
        console.log(typeof rating.account);
        if (rating.account == accountId) {
          console.log("Updatning");
          rating.rating = newRating;
          isRated = true;
        }
      });

      if (!isRated) {
        console.log("Creating new");
        material.ratings.push({ account: accountId, rating: newRating });

      }

      return this.update(material);
    })
  }
}

module.exports = new MaterialFacade(materialSchema);
