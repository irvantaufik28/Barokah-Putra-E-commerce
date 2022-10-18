const res_data = require("../helper/respons_data");

module.exports = {

  getAddressByUserID: async (req, res, next) => {
    try {
      let user_id = req.user.id
      let res_address = await req.addressUC.getAddressByUserID(user_id);
      if (res_address.is_success !== true) {

        return res
          .status(res_address.status)
          .json(res_data.failed(res_address.reason, null));
      }
      res.status(res_address.status).json(res_data.success(res_address.data));
    } catch (e) {
      next(e);
    }
  },
  createAddress: async (req, res, next) => {
    try {
      let address = {
        province: req.body.province,
        city: req.body.city,
        postal_code: req.body.postal_code,
        detail_address: req.body.detail_address,
        user_id: req.user.id,
        main_address: true,
      }

      let create_res = await req.addressUC.addNewAddress(address);
      if (create_res.is_success !== true) {
        return res
          .status(create_res.status)
          .json(res_data.failed(create_res.reason));
      }
      res.json(res_data.success(create_res.data));
    } catch (e) {
      next(e);
    }
  },

  updatetAddress: async (req, res, next) => {
    let id = req.user.id;
    try {
      let address = {
        province: req.body.province,
        city: req.body.city,
        postal_code: req.body.postal_code,
        detail_address: req.body.detail_address,
        user_id: req.user.id
      }

      let res_update = await req.addressUC.updateAddress(address, id);
      if (res_update.is_success !== true) {
        return res
          .status(res_update.status)
          .json(res_data.failed(res_update.reason));
      }
      res.status(res_update.status).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
  deleteAddress: async (req, res, next) => {
    let id = req.params.id;
    let user_id = req.user.id
    try {
      let delete_res = await req.addressUC.deleteAddress(id, user_id);
      if (delete_res.is_success !== true) {
        return res
          .status(delete_res.status)
          .json(res_data.failed(delete_res.reason));
      }
      res.json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
  changeMainAddress: async (req, res, next) => {
    let address_id = req.params.address_id 
    let user_id = req.user.id
     
    try {

      let res_update = await req.addressUC.changeMainAddress(address_id, user_id )
      if (res_update.is_success !== true) {
        return res
          .status(res_update.status)
          .json(res_data.failed(res_update.reason))
      }
      res.status(res_update.status).json(res_data.success())

    } catch (e) {
      next(e)
    }
  }
};
