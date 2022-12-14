'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.OrderDetail, {
        as: 'order_details',
        foreignKey: { name: 'order_id', allowNull: false }
      })
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: { name: 'user_id', allowNull: false }
      })
    }
  }

  Order.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  })

  return Order;
};