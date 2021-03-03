const CampaignAttachment = require('../models').CampaignAttachment
const Sequelize = require('sequelize')
const Op = Sequelize.Op
let generalHelper= require('./generalRepository')

var queryCampaignAttachment = {}
let campaignAttachmentRepository = {

    findAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"customerId")){
            if(req.query.campaignId){
                queryCampaignAttachment = {
                    customerId:req.query.customerId
                }
            }
        }
        var data = CampaignAttachment.findAndCountAll(
            {
                limit:req.query.limit,
                offset:req.offset,
                where:queryCampaignAttachment,
                order:[['id','DESC']],
                //include: userAssociatedModel.includeModel(req)
            }
        )
        return data
        
    },

    countAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"customerId")){
            if(req.query.file){
                queryCampaignAttachment = {
                    customerId:req.query.customerId
                }
            }
        }
        
        var data = CampaignAttachment.count(
            {
                where:queryCampaignAttachment,
            }
        )
        return data
        
    },

    findById : (req) => {
        let data = CampaignAttachment.findByPk(req.params.id,{
            //include: userAssociatedModel.includeModel(req)
        })
        return data
    },
    
    createNew : (req) => {
        return CampaignAttachment
        .create(
            {
                customerId:req.body.customerId,
                campaignId:req.body.campaignId,
                attachmentId:req.body.attachmentId,
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

module.exports = campaignAttachmentRepository
