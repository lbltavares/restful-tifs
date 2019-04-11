const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Cliente';

const schema = new Schema({
    nome: { type: String, required: true, unique: true },
    cpf: { type: String, unique: true },
    telefone: { type: String, unique: true },
    nascimento: { type: Date },
    alergias: { type: Boolean },
    sexo: { type: String },
});

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);