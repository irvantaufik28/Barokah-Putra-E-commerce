const res_data = require("../helper/respons_data");

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      let res_user = await req.userUC.getAllUser();
      if (res_user == null) {
        return res
          .status(404)
          .json(res_data.failed(res_user.reason, res_user.data));
      }
      res.json(res_data.success(res_user.data));
    } catch (e) {
      next(e);
    }
  },
  getUserByID: async (req, res, next) => {
    try {
      let id = req.params.id;
      let res_user = await req.userUC.getUserByID(id);
      if (res_user == null) {
        return res
          .status(404)
          .json(res_data.failed(res_user.message, null));
      }
      res.status(200).json(res_data.success(res_user.data));
    } catch (e) {
      next(e);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      let id = req.user.id
      let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        phone: req.body.phone,
      };

      let res_update = await req.userUC.updateUserProfile(user, id);
      if (res_update.is_success !== true) {
        return res
          .status(res_update.status)
          .json(res_data.failed(res_update.reason, null));
      }
      res.status(res_update.status).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
  updatePassword: async (req, res, next) => {
    let id = req.user.id
    let user = {
      oldPassword: req.body.oldPassword,
      newPassword : req.body.newPassword,
      confrimNewPassword : req.body.confrimNewPassword
    }
    try {
      let res_user = await req.userUC.updatePassword(user, id)
      if (res_user.is_success !== true) {
        return res
          .status(res_user.status)
          .json(res_data.failed(res_user.reason))
      }
      res.status(res_user.status).json(res_data.success())
    } catch (e) {
      next(e)
    }

  },
  updateEmail : async (req, res, next)=>{
    let id = req.user.id
    let user = {
      email : req.body.email,
      otp_code : req.body.otp_code
    }
    try {
      
      let res_update = await req.userUC.updateEmail(user, id)
      if(res_update.is_success !== true){
        return res
        .status(res_update.status).json(res_data.failed(res_update.reason))
      }
      res.status(res_update.status).json(res_data.success())
    } catch (e) {
      next(e)
    }
  }

};
