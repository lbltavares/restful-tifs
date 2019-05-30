const muv = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NOME_MODELO = 'Serviço';

const schema = new Schema({
    nome: { type: String, required: true },
    data: { type: Date, default: Date.now },
    anotacoes: { type: String },
    cliente: { type: String, required: true },
    produtos: [{ type: Schema.Types.ObjectId, Ref: "Produto" }],

}, { Strict: false });

schema.plugin(muv);

module.exports = mongoose.model(NOME_MODELO, schema);