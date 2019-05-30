const express = require('express');
const Cabeleireiro = require('./cabeleireiro.modelo');
const fake = require('../fake');
const Auth = require('./authenticate');
const validador = require('../validações');
const router = express.Router();

router.get('/', (req, res, next) => {
    Cabeleireiro.find(req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err); });
});

router.get('/:id', (req, res, next) => {
    Cabeleireiro.findOne({ _id: req.params.id })
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err); });
});

router.get('/criar/:num', (req, res, next) => {
    let num = req.params.num;
    for (let i = 0; i < num; i++) {
        let c = new Cabeleireiro(fake.Cabeleireiro());
        c.save();
    }
    res.status(200).json();
});

router.post('/', (req, res, next) => {
    let c = new Cabeleireiro(req.body);
    // if (!validador.validarNome(c.nome)) res.status(500).json({ msg: 'Nome invalido' });
    // if (!validador.validarNome(c.sobrenome)) res.status(500).json({ msg: 'Sobrenome invalido' });
    // if (!validador.validarCnpj(c.cnpj)) res.status(500).json({ msg: 'CNPJ invalido' });
    // if (!validador.validarTelefone(c.telefone)) res.status(500).json({ msg: 'Telefone invalido' });
    // if (!validador.validarEmail(c.email)) res.status(500).json({ msg: 'Email invalido' });
    c.save()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.put('/', (req, res, next) => {
    let c = req.body;
    Cabeleireiro.updateOne({ _id: req.body._id }, req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.delete('/', (req, res, next) => {
    Cabeleireiro.deleteOne({ _id: req.body._id })
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.post('/autenticar', Auth.authenticate);


module.exports = router;