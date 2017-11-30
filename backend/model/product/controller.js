const passport = require('passport');
const Controller = require('../../lib/controller');
const ProductFacade = require('./facade');
const config = require('../../config');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

class ProductController extends Controller {
  create(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (
        !user ||
        (user.role !== config.userRole.companyRep &&
          user.role !== config.userRole.companyAdmin)
      ) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const newProduct = req.body;
      newProduct.company = user.company;

      if (newProduct.category === '') {
        delete newProduct.category;
      }

      return this.facade
        .create(newProduct)
        .then(doc => res.status(201).json(doc))
        .catch(err => next(err));
    })(req, res, next);
  }

  uploadMaterial(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      if (
        !user ||
        (user.role !== config.userRole.companyRep &&
          user.role !== config.userRole.companyAdmin)
      ) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const material = {
        title: req.body.title,
        description: req.body.description,
        url: `/product/${req.params.id}/material/${req.file.id}`,
        _id: req.file.id
      };

      return this.facade
        .saveMaterial(req.params.id, material)
        .then(resp => res.status(201).json(resp))
        .catch(err => next(err));
    })(req, res, next);
  }

  uploadMiddleware(req, res, next) {
    const gridfs = new GridFsStorage({
      url: config.mongo.url,
      file: (req, file) => {
        return {
          filename: file,
          bucketName: 'material'
        };
      }
    });

    return multer({ storage: gridfs }).single('file');
  }

  getMaterialFile(req, res, next) {
    return this.facade
      .getMaterialFile(req.params.material)
      .then(file => {
        if (!file) {
          return res.status(404);
        }
        res.contentType('application/pdf');
        res.setHeader(
          'Content-disposition',
          `attachment; filename=${file.name}`
        );
        file.pipe(res.status(200));
      })
      .catch(err => next(err));
  }
}

module.exports = new ProductController(ProductFacade);
