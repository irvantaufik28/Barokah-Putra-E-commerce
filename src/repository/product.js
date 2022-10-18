const { Product, Category, ImageProduct, OrderDetail } = require("../database/models");

class ProductRepository {
  constructor() {
    this.productModel = Product;
    this.categoryModel = Category;
    this.imageProductModel = ImageProduct;
    this.orderDetailModel = OrderDetail;
  }

  async getProductByID(id) {
      return await this.productModel.findOne({
        where: { id: id },
        include: [
          {
            model: this.imageProductModel,
            as: 'image_products',
          },
        ],
      })
    }

  async getProducts(product) {
      return await this.productModel.findAll(product)
  }

  async createProduct(product) {
    return await this.productModel.create(product);
  }
  async updateProduct(product, id) {
    return await this.productModel.update(product, {
      where: { id: id },
    });
  }
  async deleteProduct(id) {
    return await this.productModel.destroy({
      where: { id: id },
    });
  }
}

module.exports = ProductRepository;
