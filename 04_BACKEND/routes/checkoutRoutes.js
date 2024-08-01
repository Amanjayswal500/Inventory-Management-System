const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Add a new checkout
router.post('/addcheckout', checkoutController.addCheckout);

// Get all checkouts
router.get('/getcheckouts', checkoutController.getCheckouts);

// Get checkouts by user ID
router.get('/getcheckouts/:user_id', checkoutController.getCheckoutByUserId);

// Get checkout by ID
router.get('/getcheckout/:id', checkoutController.getCheckoutById);

// Update checkout by ID
router.put('/updatecheckout/:id', checkoutController.updateCheckout);

// Delete checkout by ID
router.delete('/deletecheckout/:id', checkoutController.deleteCheckout);

module.exports = router;