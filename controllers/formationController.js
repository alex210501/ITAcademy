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
    let idFormation = parseInt(req.params.idformation);
    
    database.query("SELECT iduser from user WHERE pseudo=?", req.session.user, (error, result) => {
        if (error) console.log(error);
        else {
            let idUser = parseInt(result[0].iduser);
            
            // Check if the values are not on the subscription table
            database.query("SELECT * FROM subscription WHERE iduser=? AND idformation=?", [idUser, idFormation], (error, result) => {
                if (error) console.log(error);
                else {
                    if (result.length == 0) { 
                        database.query("INSERT INTO subscription (iduser, idformation) VALUES (?,?)",   
                                      [idUser, idFormation], (error, result) => {if (error) console.log(error)});    
                    }
                }
            });
        }
    });
    res.redirect('/formations');
}
