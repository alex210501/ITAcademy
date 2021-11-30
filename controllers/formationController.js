let database = require('../database');

module.exports.formationList = function (req, res) {
	formationList = [];

	database.query("SELECT * from formation", (error, result) => {
		if (error) console.log(error);
		else {
			console.log(result);
			formationList = result;
		}
		res.render('formationList.ejs', { formations: result});
	});

}