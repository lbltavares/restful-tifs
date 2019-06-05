const auth = require('./cabeleireiro.modelo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {

    authenticate: function(req, res, next) {
        auth.findOne({email:req.body.email}, function(err, info){
            if (err || !info) {
                res.json({status:"error", message: "Usuário não existe", data:null});
            } else {
                if(bcrypt.compareSync(req.body.senha, info.senha)) {
                    const token = jwt.sign({id: info._id}, config.TOKEN_SECRET, { expiresIn: '2h' });
                    res.json({status:"success", message: "Usuário encontrado!", data:{user: info, token:token}});
                }else{
                    res.json({status:"error", message: "Email/Senha inválidos!", data:null});
                }
            }
        });
    },
}