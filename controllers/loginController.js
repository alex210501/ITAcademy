let database = require('../database');


function checkUserRegistration(user) {
    database.query('SELECT * FROM user WHERE pseudo=?', user, (error, pseudo) => {
        if (error) console.log(error);
        else {
            if (!(pseudo.length > 0)) {
                     database.query('INSERT INTO user (pseudo) VALUES (?)', user,
                                   (error, result) => {if (error)console.log(error);
                                                       console.log(result)} );
                }
        }
    });
}

module.exports.loginSetup = function(req, res) {
    res.render('login.ejs');
}

module.exports.loginCheck = async function(req, res) {
    let user = req.body.user;
    
    if (user) {
            checkUserRegistration(user);
            req.session.user = user;
        }
    res.redirect('/formations');
}