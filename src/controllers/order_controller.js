const res_data = require("../helper/respons_data");
const order_constants = require("../internal/constants/order");
module.exports = {
  getOrder: async (req, res, next) => {
    let user_id = req.user.id;
    try {
      let order = await req.orderUC.getPendingOrderByUserID(user_id);
      if (order.is_success !== true) {
        return res
          .status(order.status)
          .json(res_data.failed(order.reason));
      }
      res.status(order.status).json(res_data.success(order.data));
    } catch (e) {
      next(e);
    }
  },

  createOrder: async (req, res, next) => {
    let user_id = req.user.id
    let items = req.body.items
    try {
      let create_res = await req.orderUC.createOrder(user_id, items)
      if (create_res.is_success !== true) {
        return
      }
      res.status(create_res.status).json(create_res.data)
    } catch (e) {
      next(e)
    }
  },
  changeStatuOrder: async (req, res, next) => {
    let user_id = req.user.id
    try {
      
    let res_update =  await req.orderUC.changeOrderStatus(user_id)
      if(res_update.is_success !== true){
        return 
      }
      res.status(200).json(res_data.success())
    } catch (e) {
      next(e)
    }
  }
}
