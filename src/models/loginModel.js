const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  
  register() {
    this.isValid();
    if(this.errors.length > 0) return;
  }

  isValid() {
    // Validation
    this.cleanUp();
    // Email validation
    if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido');
    // Password Validation
    if(this.body.password.length < 4 || this.body.password > 12) this.errors.push('A senha precisa ter entre 4 e 12 caracteres');

  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  
    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }



}

module.exports = Login;
