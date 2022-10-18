const res_data = require("../helper/respons_data");
const default_Image = require("../internal/constants/defaultImage")


module.exports = {
  register: async (req, res, next) => {
    try {
      let user_data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        confrimPassword :req.body.confrimPassword,
        phone: req.body.phone,
        email: req.body.email,
        avatar: null,
        role_id: 2,
        otp_code : req.body.otp_code
      };
      let avatar = null;
      if (req.file != undefined) {
        avatar = (req.file.path);
      } else {
        avatar = default_Image.DEFAULT_AVATAR
      }
      user_data.avatar = avatar;

      let res_user = await req.authUC.register(user_data);
      if (res_user.is_success != true) {
        return res
          .status(res_user.status)
          .json(res_data.failed(res_user.reason));
      }

      res.json(
        res_data.success({
          user: res_user.data,
          token: res_user.token
        })
      );
    } catch (e) {
      next(e);
    }
  },

  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;
      let res_user = await req.authUC.login(username, password);
      if (res_user.is_success != true) {
        return res.status(res_user.status).json(res_data.failed(res_user.reason));
      }
      res.json(
        res_data.success({
          user: res_user.data,
          token: res_user.token
        })
      );
    } catch (e) {
      next(e);
    }
  },
  user: async (req, res, next) => {
    res.json(res_data.success(req.user));
  },
};
