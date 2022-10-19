const express = require('express')
const router = express.Router()
const product = require("../controllers/product_controller")
const category = require ("../controllers/category_controller")
const user = require('../controllers/user_controller')
const imageProduct_controller = require("../controllers/image_product_controller")
const handleUpload =require("../libs/handle_Upload")
const authorized = require("../middleware/auth")

// user
router.get('/user', authorized.admin,user.getAllUser)

// Product
router.post('/product/add',authorized.admin, handleUpload.upload.single('image') ,product.addProduct)
router.put('/product/update/:id',authorized.admin,handleUpload.upload.single('image'), product.editProduct)
router.delete('/product/delete/:id',authorized.admin, product.deleteProduct)

// image product
router.post('/image/add',authorized.admin, handleUpload.upload.single('url'), imageProduct_controller.createImageProduct)
router.put('/image/update/:id',authorized.admin, handleUpload.upload.single('url'), imageProduct_controller.updateImageProduct)
router.put('/image/change-cover-image/',authorized.admin, imageProduct_controller.changeCoverImage)
router.delete('/image/delete/:id',authorized.admin, imageProduct_controller.deleteImageProduct)

// Category
router.post('/category/add' ,authorized.admin, category.addCategory)
router.put('/category/update/:id',authorized.admin, category.editCategory)
router.delete('/category/delete/:id',authorized.admin, category.deleteCategory)


module.exports=router

