const Attachment = require('../models').Attachment
const Sequelize = require('sequelize')
const Op = Sequelize.Op
let generalHelper= require('./generalRepository')

var queryAttachment = {}
let attachmentRepository = {

    findAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"file")){
            if(req.query.campaignId){
                queryAttachment = {
                    file:{
                        [Op.like]:'%'+req.query.file+'%'
                    }
                }
            }
        }
        var data = Attachment.findAndCountAll(
            {
                limit:req.query.limit,
                offset:req.offset,
                where:queryAttachment,
                order:[['id','DESC']],
                //include: userAssociatedModel.includeModel(req)
            }
        )
        return data
        
    },

    countAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"file")){
            if(req.query.file){
                queryAttachment = {
                    file:{
                        [Op.like]:'%'+req.query.file+'%'
                    }
                }
            }
        }
        
        var data = Attachment.count(
            {
                where:queryAttachment,
            }
        )
        return data
        
    },

    findById : (req) => {
        let data = Attachment.findByPk(req.params.id,{
            //include: userAssociatedModel.includeModel(req)
        })
        return data
    },
    
    createNew : (req) => {
        return Attachment
        .create(
            {
                file:req.body.file,
                status:req.body.status,
            
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

module.exports = attachmentRepository
