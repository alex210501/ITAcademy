// Import express
let express = require('express');

// Create the router object
let router = express.Router();


router.get('/formations', (req, res) => {
	res.send('Hello worlds !');
});

// Export the router module
module.exports = router;