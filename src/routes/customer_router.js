const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/user_controller')
const address_controller = require('../controllers/address_controller')
const product_controller = require('../controllers/product_controller')
const imageProduct_controller = require('../controllers/image_product_controller')
const category_controller = require('../controllers/category_controller')
const order_controller = require('../controllers/order_controller')
const authorized = require('../middleware/auth')

// user
router.get('/profile/', authorized.customer, user_controller.getUserProfil)
router.put('/update-profile/',authorized.customer ,user_controller.updateProfile)
router.put('/update-password/',authorized.customer ,user_controller.updatePassword)
router.put('/update-email/',authorized.customer ,user_controller.updateEmail)
router.put('/reset-password/',authorized.customer ,user_controller.resetPassword)




// product
router.get('/product',product_controller.getAllProduct)
router.get('/product/:id', product_controller.getOneProduct)

// image Product
router.get('/image/product/:product_id', imageProduct_controller.getImageProductByProductID)
router.get('/image/:id', imageProduct_controller.getImageProductByID)


// category
router.get('/category',category_controller.getAllCategory)
router.get('/category/product/:id',category_controller.getProductByCategory)
router.get('/category/:id', category_controller.getOneCategory)


// address
router.get('/address/',authorized.customer, address_controller.getAddressByUserID)
router.post('/address/add',authorized.customer, address_controller.createAddress)
router.put('/address/update/:id',authorized.customer, address_controller.updatetAddress)
router.put('/address/change-main-address/:address_id',authorized.customer, address_controller.changeMainAddress)
router.delete('/address/delete/:id',authorized.customer, address_controller.deleteAddress)

// Order
router.get('/order',authorized.customer, order_controller.getOrder)
router.post('/order/add/',authorized.customer, order_controller.createOrder)
router.patch('/order/submit/', authorized.customer, order_controller.changeStatuOrder)

module.exports = router