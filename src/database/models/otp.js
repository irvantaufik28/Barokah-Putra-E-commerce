'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  otp.init({
    email: DataTypes.STRING,
    otp_type: DataTypes.STRING,
    otp_code: DataTypes.STRING,
    expired_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'otp',
  });
  return otp;
};