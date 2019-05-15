const express = require('express');
const Cliente = require('./cliente.modelo');
const fake = require('../fake');
const router = express.Router();

router.get('/', (req, res, next) => {
    Cliente.find(req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err); });
});

router.get('/:id', (req, res, next) => {
    Cliente.findOne({_id: req.params.id})
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err); });
});

router.get('/criar/:num', (req, res, next) => {
    let num = req.params.num;
    for(let i = 0; i < num; i++){
        let c = new Cliente(fake.Cliente());
        c.save();
    }
    res.status(200).json();
});

router.post('/', (req, res, next) => {
    let c = new Cliente(req.body);
    c.save()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.put('/', (req, res, next) => {
    Cliente.updateOne({ _id: req.body._id }, req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

router.delete('/', (req, res, next) => {
    Cliente.deleteOne({ _id: req.body._id })
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err) });
});

module.exports = router;