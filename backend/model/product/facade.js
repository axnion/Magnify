const mongoose = require('mongoose');
const Facade = require('../../lib/facade');
const productSchema = require('./schema');

class ProductFacade extends Facade {
  findById(id) {
    return this.Schema.aggregate(
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $lookup: { from: 'materials', localField: 'material', foreignField: '_id', as: 'material' } },
      { $unwind: '$material' },
      { $addFields: {
        'material.avgRating': {
          $divide: [
            { // expression returns total
              $reduce: {
                input: '$material.ratings',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.rating'] }
              }
            },
            { // expression returns ratings count
              $cond: [
                  { $ne: [{ $size: '$material.ratings' }, 0] },
                  { $size: '$material.ratings' },
                1
              ]
            }
          ]
        },
        'material.numRatings': { $size: '$material.ratings' }
      }
      },
      { $group: {
        _id: '$_id',
        name: { $first: '$name' },
        company:  { $first: '$company' },
        category:  { $first: '$category' },
        material: { $push: '$material' }
      } },
      { $project: { 'material.ratings': 0 } } );
  }

  find() {
    return this.Schema.find()
      .populate('material');
  }
}

module.exports = new ProductFacade(productSchema);
