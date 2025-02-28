const express = require('express');
const router = express.Router();

const shopProfileController = require('../controllers/shopProfileController');

const auth = require('../middlewares/authMiddleware');

router.post('/update-profile', auth, shopProfileController.updateProfile);
router.get('/get-profile', auth, shopProfileController.getProfile);


module.exports = router;