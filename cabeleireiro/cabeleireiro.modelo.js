const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

const NOME_MODELO = 'Cabeleireiro';

const schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, unique: true },
    cnpj: { type: String, unique: true },
    dataNascimento: { type: Date },
    senha: { type: String, required: true },

}, { strict: false });

// hash user password before saving into database
schema.pre('save', function (next) {
    this.senha = bcrypt.hashSync(this.senha, saltRounds);
    next();
});

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);

