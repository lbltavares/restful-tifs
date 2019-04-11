const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.static('./public'));

// Middlewares:
app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Rotas:
app.get('/', (req, res, next) => res.status(200).redirect('/index.html'));

app.use('/cabeleireiros', require('./cabeleireiro/cabeleireiro.rotas'));
app.use('/clientes', require('./cliente/cliente.rotas'));
app.use('/produtos', require('./produto/produto.rotas'));
app.use('/servicos', require('./serviço/serviço.rotas'));

// Tratamento de rotas inválidas:
app.use((req, res, next) => {
    res.status(404).redirect('/notfound.html');
});

module.exports = app;