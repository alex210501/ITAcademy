// Import express
let express = require('express');

// Create the router object
let router = express.Router();

// Import formation controller
let formationController = require('./controllers/formationController');

router.get('/', (req, res) => res.redirect('/formations'));
router.get('/formations', formationController.formationList);

// Export the router module
module.exports = router;