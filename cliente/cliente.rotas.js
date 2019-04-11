const express = require('express');
const Cliente = require('./cliente.modelo');
const router = express.Router();

router.get('/', (req, res, next) => {
    Cliente.find(req.body)
        .exec()
        .then(result => { res.status(200).json(result); })
        .catch(err => { res.status(500).json(err); });
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