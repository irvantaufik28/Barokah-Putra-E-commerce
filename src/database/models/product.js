'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'category_id',
        allowNull: false
      })
      this.hasMany(models.OrderDetail, {
        foreignKey: { name: 'product_id', allowNull: false }
      })
      this.hasMany(models.ImageProduct, {
        as: 'image_products',
        foreignKey: { name: 'product_id', allowNull: false, }
      })
    }
  }

  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    cover_imageID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  })

  return Product;
};