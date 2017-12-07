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
        { $push: { materials: material } },
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

      // Manual validation, mongoose does not check on update for some reason
      if (newRating < 1 || newRating > 5) {
        throw new Error('Rating has to be between 1 and 5');
      }

      let isRated = false;

      material.ratings.forEach((rating) => {

        if (rating.account == accountId) {  // HAS TO BE "==" or shit will break. Trust me, I'm a comment.
          rating.rating = newRating;
          isRated = true;
        }
      });

      if (!isRated) {
        material.ratings.push({ account: accountId, rating: newRating });
      }
      return this.Schema.findByIdAndUpdate(materialId, { ratings: material.ratings }).exec();
      //return this.update(material); //This is not working, existing model should not be used.
    });
  }
}

module.exports = new MaterialFacade(materialSchema);
