const express = require('express')
const {signUp, verifyOtp, signIn, createProfile } = require('../controllers/authController')
const multer = require('multer');
const path = require('path');

const router = express.Router()

const storage = multer.memoryStorage(); // Store file in memory buffer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG image files are allowed!'));
    }
  },
});

// Route for creating a profile with profile picture upload
router.post('/create-profile', upload.single('profilePicture'), createProfile);
router.route('/signup').post(signUp)
router.route('/verify').post(verifyOtp)
router.route('/sign-in').post(signIn)

module.exports = router