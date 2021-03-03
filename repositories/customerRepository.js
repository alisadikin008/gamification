const Customer = require('./../models').Customer
const Transaction = require('./../models').Transaction
const CampaignAttachment = require('./../models').CampaignAttachment
const Campaign = require('./../models').Campaign
const Voucher = require('./../models').Voucher
const Attachment = require('./../models').Attachment
const Sequelize = require('sequelize')
const Op = Sequelize.Op
let generalHelper= require('./generalRepository')
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

var queryCustomer = {}
let customerRepository = {

    findAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"email")){
            if(req.query.email){
                queryCustomer = {
                    email:{
                        [Op.like]:'%'+req.query.email+'%'
                    } 
                }
            }
        }
        var data = Customer.findAndCountAll(
            {
                limit:req.query.limit,
                offset:req.offset,
                where:queryCustomer,
                order:[['id','DESC']],
                include: customerAssociatedModel.includeModel(req)
            }
        )
        return data
        
    },

    countAll : (req) => {
        if(generalHelper.isQueryStringExists(req.query,"email")){
            if(req.query.email){
                queryCustomer = {
                    email:{
                        [Op.like]:'%'+req.query.email+'%'
                    } 
                }
            }
        }

        var data = Customer.count(
            {
                where:queryCustomer,
            }
        )
        return data
        
    },

    findById : (req) => {
        let data = Customer.findByPk(req.params.id,{
            include: customerAssociatedModel.includeModel(req)
        })
        return data
    },
    
    createNew : (req) => {
        let hash = bcrypt.hashSync(req.body.password, salt);
        return Customer
        .findOrCreate(
            {
                where: 
                {email: req.body.email},
                 defaults: 
                    {
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        email:req.body.email,
                        password:hash,
                        gender:req.body.gender,
                        contactNumber:req.body.contactNumber,
                        dateOfBirth:req.body.dateOfBirth
                    }
                }
        ) 
    },

    findByEmail :(req) => {
        return Customer
        .findOne(
            {
                where:{email:req.body.email},
                //include: userAssociatedModel.includeModel(req)
            }
        )
    },
}

let customerAssociatedModel = {
    includeModel: (req) =>{
        var roleName = {}
        if(generalHelper.isQueryStringExists(req.query,"role")){
            if(req.query.role){
                roleName = {
                    name:{
                        [Op.like]:'%'+req.query.role+'%'
                    } 
                }
            }
        }
        
        let model =  [
            { 
                model: Transaction,
                //required: true,
                as : "transactions",
                attributes: { exclude: ['id','createdAt','updatedAt'] },
                where:roleName,
            },
            {
                model: CampaignAttachment,
                //required: true,
                as : "events",
                attributes: { exclude: ['id','customerId','createdAt','updatedAt'] },
                include:[
                    { 
                        model: Campaign,
                        //required: true,
                        as : "campaign",
                        attributes: { exclude: ['createdAt','updatedAt'] },
                        //order:[['permissionId','ASC']],
                        include:
                        { 
                            model: Voucher,
                            //required: true,
                            as : "voucher",
                            attributes: { exclude: ['id','createdAt','updatedAt'] },
                        }
                    },
                    {
                        model: Attachment,
                        //required: true,
                        as : "photoSelfie",
                        attributes: { exclude: ['id','createdAt','updatedAt'] },
                        //order:[['permissionId','ASC']],
                    } 
                ]
            }
        ]
        return model;
    }
}

module.exports = customerRepository
