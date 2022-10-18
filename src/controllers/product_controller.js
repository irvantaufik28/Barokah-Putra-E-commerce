const res_data = require("../helper/respons_data");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getAllProduct: async (req, res, next) => {
    try {
      let res_product = await req.productUC.getProducts();
      if (res_product.is_success !== true) {
        return res
          .status(res_product.status)
          .json(res_data.failed(res_product.reason, null));
      }
      res.status(res_product.status).
        json(res_data.success(res_product.data));
    } catch (e) {
      next(e);
    }
  },
  getOneProduct: async (req, res, next) => {
    let id = req.params.id;
    try {
      let res_product = await req.productUC.getProductByID(id);
      if (res_product.is_success !== true) {
        return res
          .status(res_product.status)
          .json(res_data.failed(res_product.reason, null));
      }
      res.status(res_product.status).
        json(res_data.success(res_product.data));
    } catch (e) {
      next(e);
    }
  },
  addProduct: async (req, res, next) => {

    let product = {
      id: uuidv4(),
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      sold: 0,
      description: req.body.description,
      category_id: req.body.category_id,
      cover_image : null
    };
    try {
      let res_product = await req.productUC.addNewProduct(product);
      if (res_product.is_success != true) {
        res.status(res_product.status).json(res_data.failed(res_product.reason));
      }

      res.status(res_product.status).json(res_data.success(res_product.data));
    } catch (e) {
      next(e);
    }
  },
  editProduct: async (req, res, next) => {
    try {
      let id = req.params.id;
      let product = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        category_id: req.body.category_id,
      };

      let update_res = await req.productUC.updateProduct(product, id);
      if (update_res.is_success !== true) {
        return res.status(update_res.status).json(res_data.failed(update_res.reason));
      }
      res.status(update_res.status).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      let id = req.params.id;

      let delete_res = await req.productUC.deleteProduct(id);
      if (delete_res.is_success !== true) {
        return res.status(delete_res.status).json(res_data.failed(delete_res.reason));
      }
      res.status(delete_res.status).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
};
