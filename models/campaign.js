'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Campaign.hasOne(models.Voucher, {
        foreignKey: 'campaignId',
        as: 'voucher'
      });
    }
  };
  Campaign.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    closedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};