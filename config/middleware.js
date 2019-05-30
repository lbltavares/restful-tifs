// middleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');

const withAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(401).send('Falha ao autorizar: Nenhum token fornecido');
    } else {
        jwt.verify(token, config.TOKEN_SECRET, function(err, decoded) {
            if (err) {
                res.status(401).send('Falha ao autorizar: Token inválido');
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
}
module.exports = withAuth;