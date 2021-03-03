const express = require('express');
const router = express.Router();
let transactions = require('../repositories/transactionRepository');
let requiredBodyRequest = require('../repositories/requiredBodyRequest');
let paginate = require('express-paginate');

router.get('/', function(req, res, next) {
  transactions
    .findAll(req)
    .then(results => {
        transactions.countAll(req).then(countData=>{
            const itemCount = countData;
            const pageCount = Math.ceil(itemCount / req.query.limit);
            res.json({
                status: "OK",
                data: results.rows,
                pageCount,
                itemCount,
                pages: paginate.getArrayPages(req)(Number(process.env.PAGINATION_URL), pageCount, req.query.page)
            });
        })
    }).catch(err => next(err))
});

router.get('/:id', function(req, res, next) {
    transactions.findById(req).then(data => {
        let responsData = {
            status: 'OK',
            data: data,
        };
        return res.json(responsData);
    });
});

router.post('/', function(req, res, next) {
    try{
        transactions.createNew(req).then(data=> {
            let responsData = {
                status: 'Success',
                data: data,
            };
            return res.json(responsData);
        });
    }catch{   
        return res.status(200).json(requiredBodyRequest.requiredPayload());
    }
    
});

module.exports = router;
