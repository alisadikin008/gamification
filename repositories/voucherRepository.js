const Voucher = require('../models').Voucher
const Sequelize = require('sequelize')
const Op = Sequelize.Op
let generalHelper= require('./generalRepository')

var queryVoucher = {}
let voucherRepository = {

    findAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"status")){
            if(req.query.status){
                queryVoucher = {
                    status:req.query.status
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
        if(generalHelper.isQueryStringExists(req.query,"status")){
            if(req.query.status){
                queryVoucher = {
                    status:req.query.status
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

module.exports = voucherRepository
