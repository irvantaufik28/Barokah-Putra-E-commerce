'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: { name: 'product_id', allowNull: false }
      })
    }
  }

  ImageProduct.init({
    url: DataTypes.STRING,
    cover_image : DataTypes.BOOLEAN,
    product_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImageProduct',
    tableName: 'Image_Products'
  });

  return ImageProduct;
};
