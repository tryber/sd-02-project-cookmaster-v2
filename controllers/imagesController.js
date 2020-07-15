const multer = require('multer');
const { addURL } = require('../services/recipesService');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const type = file.mimetype.replace('image/', '');
    req.type = type;
    callback(null, `${req.params.id}.${type}`);
  },
});

const upload = multer({ storage });

const addImage = upload.single('image');

const saveDB = async (req, res) => {
  const { id } = req.params;
  const recipe = await addURL(`localhost:${process.env.PORT}/images/${id}.${req.type}`, id);
  res.status(201).json({
    recipe,
  });
};

module.exports = {
  addImage,
  saveDB,
};
