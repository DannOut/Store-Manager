const express = require('express');
const productsController = require('../controllers/productsController');
const validateName = require('../middlewares/validateProductName');

const router = express.Router();

//  ROUTES HERE
router.get('/', productsController.findAll);
router.get('/:id', productsController.findById);
router.post('/', validateName, productsController.createProduct);
router.put('/:id', validateName, productsController.update);

// END ROUTERS
module.exports = router;
