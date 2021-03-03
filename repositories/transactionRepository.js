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

// let customerAssociatedModel = {
//     includeModel: (req) =>{
//         var roleName = {}
//         if(generalRepository.isQueryStringExists(req.query,"role")){
//             if(req.query.role){
//                 roleName = {
//                     name:{
//                         [Op.like]:'%'+req.query.role+'%'
//                     } 
//                 }
//             }
//         }
        
//         let model =  [
//             { 
//                 model: Role,
//                 //required: true,
//                 as : "role",
//                 attributes: { exclude: ['id','createdAt','updatedAt'] },
//                 where:roleName,
//                 include:
//                 { 
//                     model: PermissionRole,
//                     //required: true,
//                     as : "permissionRole",
//                     attributes: { exclude: ['id','createdAt','updatedAt'] },
//                     order:[['permissionId','ASC']],
//                     include:
//                     { 
//                         model: Permission,
//                         //required: true,
//                         as : "permission",
//                         attributes: { exclude: ['id','createdAt','updatedAt'] },
//                         include:[
//                             {
//                                 model: Url,
//                                 //required: true,
//                                 as : "url",
//                                 attributes: { exclude: ['id','createdAt','updatedAt'] },
//                             },
//                             {
//                                 model: Method,
//                                 //required: true,
//                                 as : "method",
//                                 attributes: { exclude: ['id','createdAt','updatedAt'] },
//                             }
//                         ]
//                     }
//                 }
//             },
//             {
//                 model: Company,
//                 //required: true,
//                 as : "company",
//                 attributes: { exclude: ['id','createdAt','updatedAt'] }, 
//             }
//         ]
//         return model;
//     }
// }

module.exports = transactionRepository
