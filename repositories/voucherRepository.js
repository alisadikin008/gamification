const Voucher = require('../models').Voucher
const Sequelize = require('sequelize')
const Op = Sequelize.Op
let generalHelper= require('./generalRepository')

var queryVoucher = {}
let voucherRepository = {

    findAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"status") && generalHelper.isQueryStringExists(req.query,"status")){
            if(req.query.status && req.query.campaignId){
                queryVoucher = {
                    [Op.and]: [
                        {
                            campaignId: req.query.campaignId,
                            status: req.query.status
                        },
                    ]
                }
            }
        }
        var data = Voucher.findAndCountAll(
            {
                limit:req.query.limit,
                offset:req.offset,
                where:queryVoucher,
                order:[['id','DESC']],
                //include: userAssociatedModel.includeModel(req)
            }
        )
        return data
        
    },

    countAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"status") && generalHelper.isQueryStringExists(req.query,"status")){
            if(req.query.status && req.query.campaignId){
                queryVoucher = {
                    [Op.and]: [
                        {
                            campaignId: req.query.campaignId,
                            status: req.query.status
                        },
                    ]
                }
            }
        }
        
        var data = Voucher.count(
            {
                where:queryVoucher,
            }
        )
        return data
        
    },

    findById : (req) => {
        let data = Voucher.findByPk(req.params.id,{
            //include: userAssociatedModel.includeModel(req)
        })
        return data
    },
    
    createNew : (campaignId,voucherCode,status) => {
        Voucher
        .create(
            {
                campaignId:campaignId,
                voucherCode:voucherCode,
                status:status
            }
        ) 
        return
    },

    update:(req, id) =>{
        return Voucher
        .update(
            {
                status:req.body.status
            },
            {
                where:{id:id}
            }
        )
    },

}

module.exports = voucherRepository
