// Import express
let express = require('express');

// Create the router object
let router = express.Router();

// Import formation controller
let formationController = require('./controllers/formationController');

// Import logging controller
let loginController = require('./controllers/loginController');

// Redirection for all the routes (get and post)
router.get('/', (req, res) => res.redirect('/formations'));
router.get('/login', loginController.loginSetup);
router.get('/cart/login', loginController.cartLoginSetup);
router.post('/login', loginController.loginCheck);
router.post('/cart/login', loginController.cartLoginCheck);
router.get('/formations', formationController.formationList);
router.get('/formations/subscribe/:idformation', formationController.formationSubscribe);
router.get('/cart', formationController.cartList);
router.get('/cart/delete/:idformation', formationController.deleteSubscription);
router.get('/cart/endSubscription', formationController.endSubscription);

// Export the router module
module.exports = router;