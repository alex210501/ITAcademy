// Import express
let express = require('express');

// Initialize the app
let app = express();
app.use(express.urlencoded({extended:true}));

// Import express-session
let session = require('express-session');
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
}));

// Add the /public directory
app.use(express.static('./public'));

// Import router
let router = require('./routes');
app.use('/', router);

// Create port
let port = 2121;

// Listen to the specified port
app.listen(port, () => {
	console.log('Running on port ' + port);
});

