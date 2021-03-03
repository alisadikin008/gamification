'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CampaignAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CampaignAttachment.belongsTo(models.Campaign, {
        foreignKey: 'campaignId',
        as: 'campaign'
      });
      CampaignAttachment.belongsTo(models.Attachment, {
        foreignKey: 'attachmentId',
        as: 'photoSelfie'
      });
    }
  };
  CampaignAttachment.init({
    customerId: DataTypes.INTEGER,
    campaignId: DataTypes.INTEGER,
    attachmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CampaignAttachment',
  });
  return CampaignAttachment;
};