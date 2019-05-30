const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const withAuth = require('./config/middleware');

const app = express();
app.use(express.static('./public'));

app.use(cookieParser());

// jwt secret token
app.set('secretKey', 'nodeRestApi');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.json({ "tutorial": "Build REST API with node.js" });
});

// private route
// app.get('/clientes', withAuth, function (req, res) {
//     res.send("...");
// });
//
// app.post('/clientes', withAuth, function (req, res) {
//     res.send("...");
// });
//
// app.get('/produtos', withAuth, function (req, res) {
//     res.send("...");
// });
//
// app.post('/produtos', withAuth, function (req, res) {
//     res.send("...");
// });


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

app.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});

// Tratamento de rotas inválidas:
app.use((req, res, next) => {
    res.status(404).redirect('/notfound.html');
});

module.exports = app;