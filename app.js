const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cabeleireiros = require('./cabeleireiro/cabeleireiro.rotas') ;
const clientes = require('./cliente/cliente.rotas');
const produtos = require('./produto/produto.rotas');
const config = require('./config');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('./public'));

app.set('secretKey', 'nodeRestApi'); // jwt secret token

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.json({"tutorial" : "Build REST API with node.js"});
    });

// public route
app.use('/cabeleireiros', cabeleireiros);

// private route
app.use('/produtos', validateUser, produtos);
app.use('/clientes', validateUser, clientes);

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], config.TOKEN_SECRET, function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}


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