const mongoose = require('mongoose');

// Usar com o MongoDB Atlas
// const USUARIO = 'tifs';
// const SENHA = 'tis3tifs';
// const URL = `mongodb+srv://${USUARIO}:${SENHA}@tifs-cluster-mhtrq.gcp.mongodb.net/tifsdb?retryWrites=true`;

// Usar com o MongoDB Local
const URL = 'mongodb://localhost/tifsdb';

module.exports = {
    init: function (callback) {
        mongoose.connection.once('open', callback);
        mongoose.connect(URL, { useCreateIndex: true, useNewUrlParser: true });
    }
};