// Import express
let express = require('express');

// Create the router object
let router = express.Router();

// Import formation controller
let formationController = require('./controllers/formationController');

// Import logging controller
let loginController = require('./controllers/loginController');

router.get('/', (req, res) => res.redirect('/formations'));
router.get('/login', loginController.loginSetup);
router.post('/login', loginController.loginCheck);
router.get('/formations', formationController.formationList);
router.get('/formations/subscribe/:idformation', formationController.formationSubscribe);
router.get('/cart', formationController.cartList);

// Export the router module
module.exports = router;