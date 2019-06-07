const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.static('./public'));

app.use(cookieParser());

// jwt secret token
app.set('secretKey', 'nodeRestApi');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.json({ "tutorial": "Build REST API with node.js" });
});


var apiRoutes = express.Router(); 


apiRoutes.use(function(req, res, next) {


  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {

    jwt.verify(token, config.TOKEN_SECRET, function(err, decoded) {
    if (err) {
        return res.json({ success: false, message: 'Falha ao autenticar o token.' });
    } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({ 
        success: false, 
        message: 'Token não fornecido' 
    });

  }
});


app.use('/clientes', apiRoutes);
app.use('/servicos', apiRoutes);
app.use('/produtos', apiRoutes);


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

app.get('/checkToken', apiRoutes, function (req, res) {
    res.sendStatus(200);
});

// Tratamento de rotas inválidas:
app.use((req, res, next) => {
    res.status(404).redirect('/notfound.html');
});

module.exports = app;