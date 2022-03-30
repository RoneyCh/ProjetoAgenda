const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  fone: { type: String, required: false, default: '' },
  dataCriada: { type: Date, required: false, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async register() {
    this.isValid();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
  }

  isValid() {
    // Validation
    this.cleanUp();
    // Email validation
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if(!this.body.email && !this.body.telefone) this.errors.push('Pelo menos um contato precisa ser enviado.');
  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      fone: this.body.fone,
    };
  }

}

module.exports = Contato;
