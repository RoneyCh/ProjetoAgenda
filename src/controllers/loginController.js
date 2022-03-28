const Login = require('../models/loginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async (req, res) => {
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.section.save(() => {
            return res.redirect('back');
        });
        return;
    }

    res.send(login.errors);
};