let defaultImage = require("../internal/constants/defaultImage")
class Product {
  constructor(productRepository, categoryRepository, productImageRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.productImageRepository = productImageRepository
  }

  async getProductByID(id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let product = await this.productRepository.getProductByID(id);
    if (product == null) {
      result.reason = "product not found"
      return result
    }
    result.is_success = true;
    result.status = 200
    result.data = product
    return result
  }

  async getProducts(filters) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let products = await this.productRepository.getProducts(filters);
    if (products === null) {
      result.reason = "product not found"
      return result
    }
    result.is_success = true;
    result.status = 200
    result.data = products
    return result
  }

  async addNewProduct(data_product) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let existCategory = await this.categoryRepository.getCategoryByID(
      data_product.category_id
    );
    if (existCategory == null) {
      result.reason = "failed add product, category not found"
      return result
    }
    
    let product = await this.productRepository.createProduct(data_product);
    
    const setImageAsCover ={
      url : defaultImage.DEFAULT_PRODUCT_IMAGE,
      cover_image : true,
      product_id : product.id
    }
    let cover_image = await this.productImageRepository.createImageProduct(setImageAsCover)
    
    const setCoverImageID = {
      cover_imageID : cover_image.id
    }
 
     await this.productRepository.updateProduct(setCoverImageID , product.id)
     let getProduct = await this.productRepository.getProductByID(product.id)
    result.is_success = true;
    result.status = 200
    result.data = getProduct
    return result
  }

  async updateProduct(product_update, id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let existCategory = await this.categoryRepository.getCategoryByID(
      product_update.category_id
    );
    if (existCategory == null) {
      result.reason = "failed add product, category not found"
      return result
    }
    let product = await this.productRepository.updateProduct(product_update, id);
    if (product == null) {
      result.reason = "failed add product, category not found"
      result.status = 500
      return result
    }
    result.is_success = true;
    result.status = 200
    return result
  }
  async deleteProduct(id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
    }
    let existProduct = await this.productRepository.getProductByID(id);
    if (existProduct == null) {
      result.reason = "failed delete product, category not found"
      return result
    }
    let product = await this.productRepository.deleteProduct(id);
    if (product == null) {
      result.reason = "failed add product, category not found"
      result.status = 500
      return result
    }
    result.is_success = true;
    result.status = 200
    return result
  }
}

module.exports = Product;
