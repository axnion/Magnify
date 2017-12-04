const Controller = require('../../lib/controller');
const materialFacade = require('./facade');
const passport = require('passport');
const config = require('../../config');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

class MaterialController extends Controller {

  upload(req, res, next) {

    // Check authorization
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ message: info });

      // TODO: implement check for company so reps cannot upload materials to other companies
      if (
        !user ||
        (user.role !== config.userRole.companyRep &&
         user.role !== config.userRole.companyAdmin)
      ) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      return this.facade.save(req.file, req.body.title, req.body.description, req.body.productId)
        .then(resp => res.status(201).json({ message: 'File saved' }))
        .catch(err => next(err));
    })(req, res, next);
  }

  getMaterialFile(req, res, next) {
    return this.facade.getMaterialFile(req.params.id)
      .then((file) => {
        res.contentType('application/pdf');
        res.setHeader('Content-disposition', `attachment; filename=${file.name}`);
        file.stream.pipe(res.status(200));
      })
      .catch(err => next(err));
  }

  uploadMiddleware(req, res, next) {
    const gridfs = new GridFsStorage({
      url: config.mongo.url,
      file: (req, file) => ({
        filename: file,
        bucketName: 'material'
      })
    });

    return multer({ storage: gridfs }).single('file');
  }
}

module.exports = new MaterialController(materialFacade);
