const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

//  ROUTES HERE
router.get('/', productsController.findAll);

// END ROUTERS
module.exports = router;
