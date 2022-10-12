class ProductImageUC {
    constructor(productImageRepository, productRepository) {
        this.productImageRepository = productImageRepository
        this.productRepository = productRepository
    }
    async getImageProductByProductID(product_id) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
            data: null
        }
        let image = await this.productImageRepository.getAllImageByProductID(product_id)
        if (image === null) {
            result.reason = "image not added"
            return result
        }
        result.is_success = true;
        result.status = 200
        result.data = image
        return result

    }
    async getImageProductByID(image_id) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
            data: null
        }
        let image = await this.productImageRepository.getImageProductByID(image_id)
        if (image === null) {
            result.reason = "image not found"
            return result
        }
        result.is_success = true;
        result.status = 200
        result.data = image
        return result
    }

    async createImageProduct(data) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
            data: null
        }
        let product = await this.productRepository.getProductByID(data.product_id)
        if (product == null) {
            result.reason = "failed add image, Product not found"
            return result

        }
        let image = await this.productImageRepository.createImageProduct(data)
        result.is_success = true;
        result.status = 200
        result.data = image
        return result
    }
    async updateImageProduct(oldImage, id) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
        }
        let image = await this.getImageProductByID(id)
        if (image == null) {
            result.reason = "product image not found"
            return result
        }
        await this.productImageRepository.updateImageProduct(oldImage, id)

        result.is_success = true;
        result.status = 200
        return result
    }
    async deleteImageProduct(id) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
        }
        let imageExist = await this.productImageRepository.getImageProductByID(id)
        if (imageExist == null) {
            result.reason = "product image not found"
            return result
        }
        await this.productImageRepository.deleteImageProduct(id)
        result.is_success = true;
        result.status = 200
        return result
    }
}

module.exports = ProductImageUC