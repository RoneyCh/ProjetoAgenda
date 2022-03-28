const Login = require('../models/loginModel');

exports.index = (req, res) => {
     res.render('login');
};

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
            return res.redirect('index');
            });
            return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso');
    req.session.save(() => {
    return res.redirect('index');
    });

} catch(e) {
    console.log(e);
    return res.render('404');
}
};

exports.account = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.account();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
            return res.redirect('index');
            });
            return;
    }

    req.flash('success', 'Logado com sucesso!');
    req.session.user = login.user;
    req.session.save(() => {
    return res.redirect('/');
    });

} catch(e) {
    console.log(e);
    return res.render('404');
}
};

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
}