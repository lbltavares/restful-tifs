const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Produto';

const schema = new Schema({
    categoria: { type: String, required: true },
    marca: { type: String, required: true },
    linha: { type: String, required: true },
    descricao: { type: String, required: true },

}, { strict: false });

schema.index({ categoria: 1, marca: 1, linha: 1, descricao: 1 }, { unique: true });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);