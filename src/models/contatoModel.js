const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  register() {
    this.isValid();
  }

}

module.exports = Contato;
