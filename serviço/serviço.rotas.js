const express = require('express');
const Serviço = require('./serviço.modelo');
const router = express.Router();

router.get('/', (req, res, next) => {
    Serviço.find(req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err); });
});

router.post('/', (req, res, next) => {
    let c = new Serviço(req.body);
    c.save()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.put('/', (req, res, next) => {
    Serviço.updateOne({ _id: req.body._id }, req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.delete('/', (req, res, next) => {
    Serviço.deleteOne({ _id: req.body._id })
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.get('/tipo_servico', (req, res, next) => {
    res.status(200).json([
        'Escova',
        'Corte',
        'Coloração',
        'Selagem',
        'Mechas',
    ]);
});


module.exports = router;