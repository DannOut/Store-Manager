const express = require('express');
const salesController = require('../controllers/salesController');
const validateSalesProducts = require('../middlewares/validateSalesProducts');

const router = express.Router();

//  ROUTES HERE
router.post(
  '/',
  validateSalesProducts,
  salesController.createSalesProducts,
);

router.get('/', salesController.findAll);
router.get('/:id', salesController.findById);

// END ROUTERS
module.exports = router;
