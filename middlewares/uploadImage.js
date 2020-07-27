const multer = require('multer');
const recipesService = require('../services/recipesService');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: async (req, file, cb) => {
    const { params: { id }, user: { _id: userId, role } } = req;
    const existRecipe = await recipesService.showOneRecipe(id);
    if (String(existRecipe.authorId) === String(userId) || role === 'admin') {
      const type = file.mimetype.split('/');
      const fileName = `${id}.${type[1]}`;
      return cb(null, fileName);
    }
    const err = {
      error: { message: "You are not authorized to post an image", code: 'Unauthorized' } };
    req.next(err);
  },
});

const uploadImage = multer({ storage }).single('image');

module.exports = uploadImage;
