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

module.exports = campaignRepository
