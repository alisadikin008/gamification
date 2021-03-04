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

module.exports = attachmentRepository
