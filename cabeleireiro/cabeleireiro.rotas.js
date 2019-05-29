const express = require('express');
const Cabeleireiro = require('./cabeleireiro.modelo');
const fake = require('../fake');
const Auth = require('./authenticate');
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
    c.save()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.put('/', (req, res, next) => {
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