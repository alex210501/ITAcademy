let database = require('../database');

module.exports.formationList = function (req, res) {
	formationList = [];

    if (req.session.user) { 
        database.query("SELECT * from formation", (error, result) => {
            if (error) console.log(error);
            else {
                console.log(result);
                formationList = result;
            }
            res.render('formationList.ejs', { formations: formationList});
        });   
    }
    else res.send('Access denied');
}