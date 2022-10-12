const { Order, User, OrderDetail } = require("../database/models");
const order_constants = require("../internal/constants/order");
class OrderRepository {
  constructor() {
    this.OrderModel = Order;
    this.UserModel = User;
    this.OrderDetail = OrderDetail
  }

  async getPendingOrderByUserID(user_id) {
    return await this.OrderModel.findOne({
      where: {
        user_id: user_id,
        status: order_constants.ORDER_PENDING,
      }, include: [
        {
          model: this.UserModel,
          as: "user",
          attributes: ['id', 'username']
        },
        {
          model: this.OrderDetail,
          as: "order_details",
        }
      ]
    })
  }

  async createOrder(orders) {
    return await this.OrderModel.create(orders);
  }

  async updateOrder (order, id){
   return await this.OrderModel.create(order ,{
    where : {id:order.id}
   })
  }
  async getOrderByOrdeID(order_id){
    return await this.OrderModel.findOne({
      where : {order_id : order_id}
    })
  }
  async changeOrderStatus (order_id, status){
    return await this.OrderModel.update(status,{
      where:{id:order_id}
    })
  }

}

module.exports = OrderRepository;
