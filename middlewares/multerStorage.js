const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const recipeId = req.params.id;
    cb(null, recipeId);
  }
});

module.exports = storage;