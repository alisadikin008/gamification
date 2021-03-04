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

module.exports = campaignAttachmentRepository
