// Import databse
let database = require('../database');

// Import formation
let Formation = require('../models/formationModel');

// Formations subscribed list
let formationSubscribed = [];

// The confirmation message when the subscription is done
let confirmationMessage = '';

/*
    Check if the formation is already on the formationSubscribed list
    @return True if already on the list, False otherwise
*/
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

    // Get all the formation registered on the database and display them on the screen
    database.query("SELECT * from formation", (error, result) => {
        if (error) console.log(error);
        else
            formationList = result;
        res.render('formationList.ejs', { formations: formationList, confirmationMessage: confirmationMessage});

        // Reset the confirmation message
        confirmationMessage = '';
    });
}

module.exports.formationSubscribe = function(req, res) {
    // Parse the idFormation from the request
    let idFormation = parseInt(req.params.idformation);
    
    // Select all the formations where the idFormtion is equal to the one requested
    database.query('SELECT * FROM formation WHERE idformation = ?', idFormation,
                  (error, result) => {
        if (error) console.log(error);
        else {
            // Save the formation into a new Formation object
            formation = new Formation(idFormation, result[0].name, result[0].price,
                                      result[0].startdate, result[0].enddate);

            // Check if the formation is already subscribed
            if (checkFormationSubscibed(formation) == false)
                formationSubscribed.push(formation);
        }
    });

    res.redirect('/formations');
}

module.exports.cartList = function(req, res) {
    res.render('cartList.ejs', {formations: formationSubscribed});
}

module.exports.deleteSubscription = function(req, res) {
    // Parse the idFormation from the request
    let idFormation = parseInt(req.params.idformation);
    
    // Selecy all the formations which match the idFormation
    database.query('SELECT * FROM formation WHERE idformation = ?', idFormation,
                  (error, result) => {
        if (error) console.log(error);
        else {
            formation = new Formation(idFormation, result[0].name, result[0].price,
                                      result[0].startdate, result[0].enddate);
            
            // Delete the formation selected from the list
            if (checkFormationSubscibed(formation) == true) {
                for (let i in formationSubscribed) {
                    if (formationSubscribed[i].idformation == idFormation)
                        formationSubscribed.splice(i, 1);
                }
            }
        }
        
        res.redirect('/cart');
    });
}

module.exports.endSubscription = function(req, res) {
    // Set the confirmation message
    confirmationMessage = "Enregistrement réussi !"

    // If the user is not subscribed, go to the cartLogin page
    if (req.session.user == undefined) {
        res.redirect('/cart/login');
        return;
    }
    
    // Delete all the subscription
    database.query("DELETE FROM subscription WHERE iduser=?", req.session.iduser,
                  (error, result) => {
        if (error) console.log(error);
        else {
            // Insert new subscription into the table
            database.query("INSERT INTO subscription (iduser, idformation) VALUES ?", [ formationSubscribed.map(formation => [req.session.iduser, formation.idformation])], (error, result) => {
                if (error) console.log(error);
                else {
                    res.redirect('/formations');
                    formationSubscribed = [];
                }
            });
        }
    });
}
