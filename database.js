// Import MySQL
let mysql = require('mysql');

// Put connection configuation
let connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "tasks",
});

// Open a connection
connection.connect((error) => { if (error) console.log(error); });

// Export the connection to the database
module.exports = connection;