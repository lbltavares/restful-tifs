const auth = require('./cabeleireiro.modelo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    authenticate: function(req, res, next) {
        auth.findOne({email:req.body.email}, function(err, info){
            if (err) {
                next(err);
            } else {
                if(bcrypt.compareSync(req.body.senha, info.senha)) {
                    const token = jwt.sign({id: info._id}, req.app.get('secretKey'), { expiresIn: '2h' });
                    res.json({status:"success", message: "Usuário encontrado!", data:{user: info, token:token}});
                }else{
                    res.json({status:"error", message: "Email/Senha inválidos!", data:null});
                }
            }
        });
    },
}