const express = require('express')
const bcrypt = require("bcrypt")
const cloudinary = require("./src/libs/handle_Upload");
const generateToken = require("./src/helper/jwt");
const _ = require("lodash")
const app = express()
const http =require ('http')
const socketIO = require('socket.io')
app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const serverError = require("./src/middleware/server_error")

const AuthRepository = require("./src/repository/auth")
const AuthUseCase = require("./src/usecase/auth")

const ProductRepository = require("./src/repository/product")
const ProductUseCase = require("./src/usecase/product")

const ProductImageRepository = require("./src/repository/image_product")
const ProductImageUseCase = require("./src/usecase/product_image")

const CategoryRepository = require("./src/repository/category")
const CategoryUseCase = require("./src/usecase/category")

const UserRepository = require("./src/repository/user")
const UserUseCase = require("./src/usecase/user")

const AddressUseCase = require("./src/usecase/address")
const AddressRepository = require("./src/repository/address")

const OrderUseCase = require("./src/usecase/order")
const OrderRepository = require("./src/repository/order")
const OrderDetailRepository = require("./src/repository/orderDetail")

const ChatRepository = require ("./src/repository/chat")
const ChatUseCase = require ("./src/usecase/chat")

const adminRouter = require("./src/routes/admin_router")
const customerRouter = require("./src/routes/customer_router")
const authRouter = require("./src/routes/auth_router")
const chatRouter = require("./src/routes/chat_router")

const authUC = new AuthUseCase(
    new AuthRepository(),
    new UserRepository(), 
    bcrypt, 
    cloudinary,
    generateToken, 
    _,
)

const userUC = new UserUseCase(new UserRepository())
const addressUC = new AddressUseCase(
    new AddressRepository(),
    new UserRepository()
)
const categoryUC = new CategoryUseCase(new CategoryRepository())
const productUC = new ProductUseCase(
    new ProductRepository(),
    new CategoryRepository()
)

const productImageUC = new ProductImageUseCase(
    new ProductImageRepository(),
    new ProductRepository()
)

const orderUC = new OrderUseCase(
    new OrderRepository(),
    new OrderDetailRepository(),
    new ProductRepository()
)

const chatUC = new ChatUseCase(new ChatRepository())


app.use((req, res, next) => {
    req.authUC = authUC
    req.productUC = productUC
    req.productImageUC = productImageUC
    req.categoryUC = categoryUC
    req.userUC = userUC
    req.addressUC = addressUC
    req.orderUC = orderUC
    req.chatUC = chatUC
    next()
})
app.get('/', (req, res) => {
    res.json("test")
})

app.use('/admin', adminRouter)
app.use('/customer', customerRouter)
app.use('/chat', chatRouter)
app.use('/', authRouter)


const auth = require ('./src/middleware/auth')
const httpServer = http.createServer(app)
const io = socketIO(httpServer)

io.use(auth.socket_io)
io.on('connection', (socket)=>{

    let user_id = socket.handshake.auth.id
    let room = `room_${user_id}`
    socket.join(room)
    
    socket.on('sendChat', async(chat_data)=>{
        let recipient = chat_data.recipient_id
        chat_data.sender_id = user_id
        let result = await chatUC.insertChat(chat_data)
        if(result !== null){
            socket.emit('onNewChat', result)
            socket.to(`room_${recipient}`).emit('onNewChat', {
                ...result,
                is_sender: false
            })
        }
    })


    socket.on('disconnected', ()=>{
        console.log('user disconnected...')
    }) 
})



app.use(serverError);
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./src/docs/docs.json')


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


module.exports = httpServer