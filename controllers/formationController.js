// Import databse
let database = require('../database');

// Import formation
let Formation = require('../models/formationModel');

formationSubscribed = []

function checkFormationSubscibed(formation) {
    let isSubscibed = false;

    formationSubscribed.forEach(element => {
       if  (element.idformation == formation.idformation)
           isSubscibed = true;
    });
    
    return isSubscibed;
}

module.exports.formationList = function (req, res) {
	formationList = [];

    database.query("SELECT * from formation", (error, result) => {
        if (error) console.log(error);
        else {
            console.log(result);
            formationList = result;
        }
        res.render('formationList.ejs', { formations: formationList});
    });
}

module.exports.formationSubscribe = function(req, res) {
    let idFormation = parseInt(req.params.idformation);
    
    database.query('SELECT * FROM formation WHERE idformation = ?', idFormation,
                  (error, result) => {
        if (error) console.log(error);
        else {
            formation = new Formation(idFormation, result[0].name, result[0].price,
                                      result[0].startdate, result[0].enddate);
            if (checkFormationSubscibed(formation) == false) {
                formationSubscribed.push(formation);
                console.log(formationSubscribed);
                formationSubscribed.sort();
            }
        }
    });

    res.redirect('/formations');
}

module.exports.cartList = function(req, res) {
    res.render('cartList.ejs', {formations: formationSubscribed});
}
