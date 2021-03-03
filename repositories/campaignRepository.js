const Campaign = require('../models').Campaign
const Sequelize = require('sequelize')
const Op = Sequelize.Op
let generalHelper= require('./generalRepository')

var queryCampaign = {}
let campaignRepository = {

    findAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"name")){
            if(req.query.name){
                queryCampaign = {
                    name:{
                        [Op.like]:'%'+req.query.name+'%'
                    } 
                }
            }
        }
        var data = Campaign.findAndCountAll(
            {
                limit:req.query.limit,
                offset:req.offset,
                where:queryCampaign,
                order:[['id','DESC']],
                //include: userAssociatedModel.includeModel(req)
            }
        )
        return data
        
    },

    countAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"name")){
            if(req.query.name){
                queryCampaign = {
                    name:{
                        [Op.like]:'%'+req.query.name+'%'
                    } 
                }
            }
        }
        
        var data = Campaign.count(
            {
                where:queryCampaign,
            }
        )
        return data
        
    },

    findById : (req) => {
        let data = Campaign.findByPk(req.params.id,{
            //include: userAssociatedModel.includeModel(req)
        })
        return data
    },
    
    createNew : (req) => {
        return Campaign
        .create(
            {
                name:req.body.name,
                url:req.body.url,
                closedAt:req.body.closedAt,
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

module.exports = campaignRepository
