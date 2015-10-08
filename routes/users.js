var express = require('express');
var router = express.Router();

var db = require('../fake-db');

function handle(res, next) {
    return function(err, model) {
        if(err) {
            next(err);
        } else {
            res.json(model);
        }
    };
}

router.get('/', function(req, res, next) {
    db.getCollection(handle(res, next));
});

router.get('/:id', function(req, res, next) {
    db.getById(req.params.id, handle(res, next));
});

router.post('/', function(req, res, next) {
    db.create(req.body, handle(res, next));
});

router.put('/:id', function(req, res, next) {
    db.update(req.body, handle(res, next));
});

router.delete('/:id', function(req, res, next) {
    db.remove(req.params.id, handle(res, next));
});

module.exports = router;