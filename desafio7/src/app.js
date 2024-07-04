
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import usersRouter from './routes/users.router.js'
import ordersRouter from './routes/orders.router.js'
import businessRouter from './routes/business.router.js'
import productsRouter from './routes/product.router.js'
import cartsRouter from './routes/cart.router.js'

const app = express()
const PORT = 8080

dotenv.config()

const connection = mongoose.connect(process.env.MONGO_URL)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/users', usersRouter)
app.use('/api/business', businessRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})