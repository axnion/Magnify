const mongoose = require('mongoose');
const Facade = require('../../lib/facade');
const productSchema = require('./schema');

class ProductFacade extends Facade {
  findByIdAndUser(id, user) {
    const u = user === false ? null : user._id;

    return this.Schema.aggregate(
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $lookup: { from: 'materials', localField: 'materials', foreignField: '_id', as: 'materials' } },
      { $unwind: { path: '$materials', preserveNullAndEmptyArrays: true } },
      { $addFields: {
        materials: { $ifNull: ['$materials', {}] }
      } },
      { $addFields: {
        'materials.avgRating': {
          $divide: [
            { // expression returns total
              $reduce: {
                input: '$materials.ratings',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.rating'] }
              }
            },
            { // expression returns ratings count
              $cond: [
                  { $and: [
                    { $ne: ['$materials', {}] },
                    { $ne: [{ $size: '$materials.ratings' }, 0] }] },
                  { $size: '$materials.ratings' },
                1
              ]
            }
          ]
        },
        'materials.numRatings': {
          $cond: [
            { $ne: ['$materials', {}] },
            { $size: '$materials.ratings' },
            0
          ]
        },
        'materials.userRating': {
          $filter: {
            input: '$materials.ratings',
            cond: {
              $eq: ['$$this.account', mongoose.Types.ObjectId(u)]
            }
          }
        }
      } },
      { $unwind: { path: '$materials.userRating', preserveNullAndEmptyArrays: true } },
      { $addFields: {
        'materials.userRating': {
          $ifNull: ['$materials.userRating.rating', null] }
      }
      },
      { $group: {
        _id: '$_id',
        name: { $first: '$name' },
        company:  { $first: '$company' },
        category: { $first: '$category' },
        materials: { $push: '$materials' }
      } },
      {
        $addFields: {
          materials: {
            $filter: {
              input: '$materials',
              cond: {
                $ne: [{ $type: '$$this._id' }, 'missing']
              }
            }
          }
        }
      },
      { $project: { 'materials.ratings': 0 } },
      { $limit: 1 }
    );
  }

  find() {
    return this.Schema.find()
      .populate('material');
  }
}

module.exports = new ProductFacade(productSchema);
