const express = require('express');
const router = express.Router();
let vouchers = require('../repositories/voucherRepository');
let requiredBodyRequest = require('../repositories/requiredBodyRequest');
let paginate = require('express-paginate');

router.get('/', function(req, res, next) {
  vouchers
    .findAll(req)
    .then(results => {
        vouchers.countAll(req).then(countData=>{
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
    vouchers.findById(req).then(data => {
        let responsData = {
            status: 'OK',
            data: data,
        };
        return res.json(responsData);
    });
});

router.post('/', async function(req, res, next) {
    try{
        var voucher = []
        for(var i = 0;i<req.body.voucherCode.length;i++){
            await vouchers.createNew(req.body.campaignId,req.body.voucherCode[i],req.body.status)
            voucher.push(req.body.voucherCode[i])
        }
        let responsData = {
            status: 'Success',
            data: voucher,
        };
        return res.json(responsData)
    }catch{   
        return res.status(200).json(requiredBodyRequest.requiredPayload());
    }
    
});

router.put('/:id', function(req, res, next) {
    vouchers.update(req, req.params.id).then(data => {
        if (data == 0) {
            let error = {
                status: 'ERROR',
                message: 'ID not found or payload not exist',
            };
            return res.status(200).json(error);
        }

        let responsData = {
            status: 'OK',
            message: 'successfully update',
        };
        return res.json(responsData);
    });
});

module.exports = router;
