const Transaction = require('../models').Transaction
const Sequelize = require('sequelize')
const Op = Sequelize.Op
let generalHelper= require('./generalRepository')

var queryTransaction = {}
let transactionRepository = {

    findAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"email")){
            if(req.query.email){
                queryTransaction = {
                    email:{
                        [Op.like]:'%'+req.query.email+'%'
                    } 
                }
            }
        }
        var data = Transaction.findAndCountAll(
            {
                limit:req.query.limit,
                offset:req.offset,
                where:queryTransaction,
                order:[['id','DESC']],
                //include: userAssociatedModel.includeModel(req)
            }
        )
        return data
        
    },

    countAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"email")){
            if(req.query.email){
                queryTransaction = {
                    email:{
                        [Op.like]:'%'+req.query.email+'%'
                    } 
                }
            }
        }
        
        var data = Transaction.count(
            {
                where:queryTransaction,
            }
        )
        return data
        
    },

    findById : (req) => {
        let data = Transaction.findByPk(req.params.id,{
            //include: userAssociatedModel.includeModel(req)
        })
        return data
    },
    
    createNew : (req) => {
        return Transaction
        .create(
            {
                customerId:req.body.customerId,
                totalSpent:req.body.totalSpent,
                totalSaving:req.body.totalSaving
            }
        ) 
    }
}

module.exports = transactionRepository
