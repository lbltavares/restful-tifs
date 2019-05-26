const express = require('express');
const Produto = require('./produto.modelo');
const fake = require('../fake');
const router = express.Router();

router.get('/', (req, res, next) => {
    Produto.find(req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err); });
});

router.get('/:id', (req, res, next) => {
    Produto.findOne({ _id: req.params.id })
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err); });
});

router.get('/criar/:n', (req, res, next) => {
    for(let i = 0; i < req.params.n; i++) {
        let c = new Produto(fake.Produto());
        c.save()
            .then(result => { res.status(200).json(result); })
            .catch(err => { res.status(500).json(err) });
    }
});

router.get('/categorias', (req, res, next) => {
    res.status(200).json([
        'Pó Descolorante',
        'Oxidante',
        'Coloração',
        'Shampoo',
        'Máscara',
        'Condicionador',
    ]);
});

router.post('/', (req, res, next) => {
    let c = new Produto(req.body);
    c.save()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.put('/', (req, res, next) => {
    Produto.updateOne({ _id: req.body._id }, req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.delete('/:id', (req, res, next) => {
    Produto.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

module.exports = router;