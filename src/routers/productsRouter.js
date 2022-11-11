const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

//  ROUTES HERE
router.get('/', productsController.findAll);
router.get('/:id', productsController.findById);

// END ROUTERS
module.exports = router;
