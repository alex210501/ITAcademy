// Import databse
const session = require('express-session');
let database = require('../database');
const Cart = require('../models/cartModel');

// Import formation
let Formation = require('../models/formationModel');

// The confirmation message when the subscription is done
let confirmationMessage = '';

// If the session is unitialized, add a cart object
function checkCartExists (req) {
    if (req.session.cart == undefined)
        req.session.cart = JSON.stringify(new Cart());
}

module.exports.formationList = function (req, res) {
	formationList = [];

    checkCartExists(req);

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

    checkCartExists(req);

    // Parse the cart from the JSON format
    let cart = new Cart(JSON.parse(req.session.cart).formations);
    
    // Select all the formations where the idFormtion is equal to the one requested
    database.query('SELECT * FROM formation WHERE idformation = ?', idFormation,
                  (error, result) => {
        if (error) console.log(error);
        else {
            // Save the formation into a new Formation object
            formation = new Formation(idFormation, result[0].name, result[0].price,
                                      result[0].startdate, result[0].enddate);

            // Add new formation to the session
            cart.addFormation(formation);
            req.session.cart = JSON.stringify(cart);
            res.redirect('/formations');
        }
    });
}

module.exports.cartList = function(req, res) {
    checkCartExists(req);

    // Get formations from the session
    let formations = JSON.parse(req.session.cart).formations;

    res.render('cartList.ejs', {formations: formations});
}

module.exports.deleteSubscription = function(req, res) {
    // Parse the idFormation from the request
    let idFormation = parseInt(req.params.idformation);

    checkCartExists(req);

    // Parse the cart into the JSON format
    let cart = new Cart(JSON.parse(req.session.cart).formations);
    
    // Selecy all the formations which match the idFormation
    database.query('SELECT * FROM formation WHERE idformation = ?', idFormation,
                  (error, result) => {
        if (error) console.log(error);
        else {
            formation = new Formation(idFormation, result[0].name, result[0].price,
                                      result[0].startdate, result[0].enddate);
            
            // Delete the formation selected from the list
            cart.removeFormation(formation);
            req.session.cart = JSON.stringify(cart);

            // Redirect to the page /cart
            res.redirect('/cart');
        }
        
    });
}

module.exports.endSubscription = function(req, res) {
    checkCartExists(req);

    // Get the formations from the session
    let formations = JSON.parse(req.session.cart).formations;

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
            database.query("INSERT INTO subscription (iduser, idformation) VALUES ?", [formations.map(formation => [req.session.iduser, formation.idformation])], (error, result) => {
                if (error) console.log(error);
                else res.redirect('/formations');
            });
        }
    });
}
