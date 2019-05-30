const http = require('http');
const app = require('../app');
const db = require('./db');
const cliente = require('../cliente/cliente.rotas') ;
const cabelereiros = require('../cabeleireiro/cabeleireiro.rotas');
const config = require('../config');
const jwt = require('jsonwebtoken');


const PORTA = process.env.PORT || 3001;

console.log('[%s] Estabelecendo conexão com o banco de dados...', (new Date).toLocaleString());
db.init(() => {
    console.log('[%s] Conexão com o banco de dados estabelecida.', (new Date).toLocaleString());
    http.createServer(app).listen(PORTA, () => {
        console.log(`[%s] Servidor escutando na porta ${PORTA}...`, (new Date).toLocaleString());
    });
});