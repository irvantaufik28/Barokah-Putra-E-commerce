const res_data = require("../helper/respons_data");
const url = require("../libs/handle_Upload");

module.exports = {
  getImageProductByProductID: async (req, res, next) => {
    product_id = req.params.product_id;
    try {
      let res_imageProduct =
        await req.productImageUC.getImageProductByProductID(product_id);
      if (res_imageProduct.is_success !== true) {
        return res
        .status(res_imageProduct.status)
        .json(res_data.failed(res_imageProduct.reason));
      }
      res.status(200).json(res_data.success(res_imageProduct.data));
    } catch (e) {
      next(e);
    }
  },
  getImageProductByID: async (req, res, next) => {
    id = req.params.id;
    try {
      let res_imageProduct = await req.productImageUC.getImageProductByID(id);
      if (res_imageProduct.is_success !== true) {
        return res
        .status(res_imageProduct.status)
        .json(res_data.failed(res_imageProduct.reason));
      }
      res.status(res_imageProduct.status).json(res_data.success(res_imageProduct.data));
    } catch (e) {
      next(e);
    }
  },
  createImageProduct: async (req, res, next) => {
    imageData = {
      url: null,
      product_id: req.body.product_id,
      cover_image : false
    };
    try {
     if(req.file !== undefined){
      imageData.url = (req.file.path)
     }
      let res_createImage = await req.productImageUC.createImageProduct(
        imageData
      );
      if (res_createImage.is_success !== true) {
        return res
        .status(res_createImage.status)
        .json(res_data.failed(res_createImage.reason));
      }
      res.status(200).json(res_data.success(res_createImage.data));
    } catch (e) {
      next(e);
    }
  },
  updateImageProduct: async (req, res, next) => {
    let id = req.params.id;
    imageData = {
      url: null,
      product_id: req.body.product_id,
    };
    try {
      let imageProduct = null;
      imageProduct = await url.uploadCloudinaryProduct(req.file.path);
      imageData.url = imageProduct;
      let res_updateImage = await req.productImageUC.updateImageProduct(
        imageData,
        id
      );
      if (res_updateImage.is_success !== true) {
        return res
        .status(res_updateImage.status)
        .json(res_data.failed(res_updateImage.reason));
      }
      res.status(res_updateImage.status).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
  
  changeCoverImage: async (req, res, next) =>{
    let image_id = req.query.image_id
    let product_id = req.query.product_id
    let res_update = await req.productImageUC.changeCoverImage(image_id ,product_id)
    try {
      if(res_update.is_success !== true){
        return res
        .status(res_update.status)
        .json(res_data.failed(res_update.reason))
      }
      res.status(res_update.status).json(res_data.success())
    } catch (e) {
      next (e)
    }

  },

  deleteImageProduct: async (req, res, next) => {
    let id = req.params.id
    
    try {
      let res_deteleImage = await req.productImageUC.deleteImageProduct(id);
      if (res_deteleImage.is_success !== true) {
        return res
        .status(res_deteleImage.status)
        .json(res_data.failed(res_deteleImage.reason));
      }
      res.status(res_deteleImage.status).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
};
