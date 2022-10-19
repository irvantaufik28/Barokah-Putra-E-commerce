const defaultImage = require('../internal/constants/defaultImage')
class ProductImageUC {
    constructor(productImageRepository, productRepository, cloudinary) {
        this.productImageRepository = productImageRepository
        this.productRepository = productRepository
        this.cloudinary = cloudinary

    }
    async getImageProductByProductID(product_id) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
            data: null
        }
        let dataImage = {
            url: defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image: true,
            product_id: product_id,
        }
        let images = await this.productImageRepository.getAllImageByProductID(product_id)
        if (images.length === 0) {
            let newImage = await this.productImageRepository.createImageProduct(dataImage)
            images.push(newImage)
            const setCoverImageID = {
                cover_imageID: images[0].id
            }
            await this.productRepository.updateProduct(setCoverImageID, product_id)
            result.is_success = true;
            result.status = 200
            result.data = images
            return result
        }
        await this.setCoverImage(images)

        result.is_success = true;
        result.status = 200
        result.data = images
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
        if (data.url === null) {
            result.reason = "failed upload, please insert file"
            return result
        }
        let product = await this.productRepository.getProductByID(data.product_id)
        if (product == null) {
            result.reason = "failed add image, Product not found"
            return result
        }
        let existImage = await this.productImageRepository.getAllImageByProductID(data.product_id)

        this.deleteDefaultImage(existImage)

        let uploadImage = await this.cloudinary.uploadCloudinaryProduct(data.url)
        data.url = uploadImage
        let image = await this.productImageRepository.createImageProduct(data)

        let getCoverImage = await this.productImageRepository.getAllImageByProductID(data.product_id)
        await this.setCoverImage(getCoverImage)


        result.is_success = true;
        result.status = 200
        result.data = image
        return result
    }
    async deleteDefaultImage(image) {
        await image.forEach(data => {
            if (data.url === defaultImage.DEFAULT_PRODUCT_IMAGE) {
                this.deleteImageProduct(data.id)
            }
        });
    }

    
//   async addOrderDetails(order_id, items) {
//     for (let i = 0; i < items.length; i++) {
//       if (items[i].qty <= 0) {
//         continue;
//       }
    async setCoverImage(images) {
        for (let image of images) {
            if (image.cover_image=== true) {
                return
            } else {

               let newImage = await this.productImageRepository.getAllImageByProductID(image.product_id)
                const newCoverImage = {
                    cover_image: true
                }
                await this.productImageRepository.updateImageProduct(newCoverImage, newImage[0].id)

                const setCoverImageID = {
                    cover_imageID: newImage[0].id
                }
                await this.productRepository.updateProduct(setCoverImageID, newImage[0].product_id)
            }
        }
    }


    // async setCoverImage(image) {
    //     await image.filter((data) => {
    //         if (data.cover_image === true) {
    //             return
    //         } else {
    //             const newCoverImage = {
    //                 cover_image: true
    //             }
    //             this.productImageRepository.updateImageProduct(newCoverImage, image[0].id)

    //             const setCoverImageID = {
    //                 cover_imageID: image[0].id
    //             }
    //             this.productRepository.updateProduct(setCoverImageID, image[0].product_id)
    //         }
    //     })
    // }

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

    async changeCoverImage(image_id, product_id) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404
        }

        let imageExist = await this.productImageRepository.getImageProductByID(image_id)
        if (imageExist === null) {
            result.reason = "image not found"
            return result
        }

        let getCoverImage = await this.productImageRepository.getCoverImage(product_id)
        if (getCoverImage == null) {
            result.reason = "image not found"
            return result
        }
        const changeCoverImageToFalse = {
            cover_image: false
        }
        await this.updateImageProduct(changeCoverImageToFalse, getCoverImage.id)
        const newCoverImage = {
            cover_image: true
        }

        await this.updateImageProduct(newCoverImage, image_id)

        const setCoverImageID = {
            cover_imageID: image_id
        }
        await this.productRepository.updateProduct(setCoverImageID, product_id)
        result.is_success = true
        result.status = 200
        return result
    }

    async deleteImageProduct(id) {
        let result = {
            is_success: false,
            reason: "failed",
            status: 404,
        }
        let image = await this.productImageRepository.getImageProductByID(id)
        if (image == null) {
            result.reason = "image not found"
            return result
        }

        await this.productImageRepository.deleteImageProduct(id)
        result.is_success = true;
        result.status = 200
        return result
    }
}

module.exports = ProductImageUC