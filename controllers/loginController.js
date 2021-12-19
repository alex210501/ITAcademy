let database = require('../database');


module.exports.loginSetup = function (req, res) {
    res.render('login.ejs');
}

module.exports.cartLoginSetup = function (req, res) {
    res.render('cartLogin.ejs');
}

module.exports.loginCheck = async function (req, res) {
    let user = req.body.user;

    if (user) {
        database.query('insert into formations.user (pseudo) Select ? Where not exists(select * from formations.user where pseudo = ?)', [user, user], (error, pseudo) => {
            if (error) console.log(error);
            else {
                database.query('SELECT * FROM user WHERE pseudo=?', user, (error, result) => {
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

module.exports.cartLoginCheck = async function (req, res) {
    let user = req.body.user;

    if (user) {
        database.query('insert into formations.user (pseudo) Select ? Where not exists(select * from formations.user where pseudo = ?)', [user, user], (error, pseudo) => {
            if (error) console.log(error);
            else {
                database.query('SELECT * FROM user WHERE pseudo=?', user, (error, result) => {
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