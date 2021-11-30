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

module.exports.formationSubscribe = function(req, res) {
    let idFormation = req.params.idformation;
    let user;
    
    database.query("SELECT iduser from user WHERE pseudo=?", req.session.user, (error, result) => {
            if (error) console.log(error);
            else {
                let idUser = result[0].iduser;
                database.query("INSERT INTO subscription (iduser, idformation) VALUES (?,?)",
                              [idUser, idFormation], (error, result) => {if (error) console.log(error)});
            }
        });
    res.redirect('/formations');
}