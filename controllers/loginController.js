// Import the database object
let database = require('../database');

// Display the login page
module.exports.loginSetup = function (req, res) {
    res.render('login.ejs');
}

// Display the cart login page
module.exports.cartLoginSetup = function (req, res) {
    res.render('cartLogin.ejs');
}

// Insert the user on the database if it's not registered on the database
module.exports.loginCheck = async function (req, res) {
    let user = req.body.user;

    if (user) {
        // Insert the user on the database if it's not exists
        database.query('insert into formations.user (pseudo) Select ? Where not exists(select * from formations.user where pseudo = ?)', [user, user], (error, pseudo) => {
            if (error) console.log(error);
            else {
                database.query('SELECT * FROM user WHERE pseudo=?', user, (error, result) => {
                    // Register the user's session
                    if (result.length > 0) {
                        req.session.user = result[0].pseudo;
                        req.session.iduser = result[0].iduser;
                    }
                    res.redirect('/formations');
                });
            }
        });
    }
}

// Insert the user on the database if it's not registered on the database
module.exports.cartLoginCheck = async function (req, res) {
    let user = req.body.user;

    if (user) {
        // Insert the user on the database if it's not exists
        database.query('insert into formations.user (pseudo) Select ? Where not exists(select * from formations.user where pseudo = ?)', [user, user], (error, pseudo) => {
            if (error) console.log(error);
            else {
                database.query('SELECT * FROM user WHERE pseudo=?', user, (error, result) => {
                    // Register the user's session
                    if (result.length > 0) {
                        req.session.user = result[0].pseudo;
                        req.session.iduser = result[0].iduser;
                    }
                    res.redirect('/cart/endSubscription');
                });
            }
        });
    }
}