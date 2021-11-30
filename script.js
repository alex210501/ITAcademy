// Import express
let express = require('express');

// Initialize the app
let app = express(express.urlencoded( {extended:true} ));

// Import router
let router = require('./routes');
app.use('/', router);

// Listen to the specified port
app.listen(8000, () => {
	console.log('Running on port 8000');
});