const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Produto';

const schema = new Schema({
    nome: { type: String, required: true },
    marca: { type: String, required: true },
    linha: { type: String, required: true },
}, { strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);