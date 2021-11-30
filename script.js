// Import express
let express = require('express');

// Initialize the app
let app = express(express.urlencoded( {extended:true} ));

// Default URL
app.get('/', (req, res) => {
	res.send("Hello world !");
});

app.listen(8000, () => {
	console.log('Running on port 8000');
});