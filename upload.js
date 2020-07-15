const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    const fileExtension = file.mimetype.replace('image/', '');
    callback(null, `${req.params.id}.${fileExtension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.includes('image')) {
      return callback(null, true);
    }
    callback(null, false);
  },
});

module.exports = { upload };
