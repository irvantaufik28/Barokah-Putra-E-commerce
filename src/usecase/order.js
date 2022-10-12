const order_constants = require("../internal/constants/order");
class Order {
  constructor(orderRepository, orderDetailRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
  }

  async getPendingOrderByUserID(user_id) {
    let result = {
      is_success: false,
      reason: '',
      status: 404,
      data: null
    }

    let order = await this.orderRepository.getPendingOrderByUserID(user_id)
    if (order === null) {
      result.result = "customer has not ordered"
      return result
    }
    result.is_success = true
    result.status = 200
    result.data = order
    return result
  }

  async createOrder(user_id, items) {
    let result = {
      is_success: false,
      reason: '',
      status: 404,
      data: null
    }
    let order_data = {
      user_id: user_id,
      status: order_constants.ORDER_PENDING
    }

    let order = await this.orderRepository.getPendingOrderByUserID(user_id)
    if (order === null) {
      order = await this.orderRepository.createOrder(order_data)
    }
    await this.addOrderDetails(order.id, items)
    let newOrder = await this.getPendingOrderByUserID(user_id)
    result.is_success = true
    result.data = newOrder
    result.status = 200
    return result
  }

  async addOrderDetails(order_id, items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].qty <= 0) {
        continue;
      }

      let product = await this.productRepository.getProductByID(items[i].id);
      if (product !== null) {
        let qty = items[i].qty;
        let price = product.price;
        let total = price * qty;
        let detail = {
          order_id: order_id,
          product_id: product.id,
          qty: qty,
          price,
          total,
        };

        let existDetail = await this.orderDetailRepository.getByOrderAndProduct(order_id, product.id);

        if (existDetail !== null) {
          let newQty = existDetail.qty + qty;
          let newTotal = price * newQty;

          existDetail.update({
            qty: newQty,
            price,
            total: newTotal,
          });
        } else {
          await this.orderDetailRepository.createOrderDetails(detail);
        }
      }
    }
  }
  async changeOrderStatus(user_id) {
    let result = {
      is_success: false,
      reason: '',
      status: 404,
      data: null
    }
    let status = order_constants.ORDER_SUBMITTED
    let getPendingOrder = await this.orderRepository.getPendingOrderByUserID(user_id)
    if (getPendingOrder === null) {
      result.reason = "customer has not ordered"
      return result
    }
    await this.orderRepository.changeOrderStatus(getPendingOrder.id, status)
    result.is_success = true
    result.status = 200
    return result
  }
  async updateStock(product_id, qty, status) {
    let product = await this.productRepository.getOrderByOrdeID(product_id)
    let newStock = 0
    if (status === order_constants.ORDER_PROCESSED) {
      newStock = product.stock - qty
    }
    if (status === order_constants.ORDER_CANCELED) {
      newStock = product.stock + qty
    }
    return await this.productRepository.updateProduct({
      stock: newStock, product_id
    })
  }

}
module.exports = Order;
