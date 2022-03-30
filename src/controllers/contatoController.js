const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
  res.render("contato", {
      contato: {}
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contato"));
      return;
    }

    req.flash("success", "Contato registrado com sucesso!");
    req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
    return;
  } catch (e) {
    console.log(e);
  }
};

exports.userIndex = async (req,res) => {
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.searchId(req.params.id);
    if(!contato) return res.render('404');
    res.render('contato', { contato })
};