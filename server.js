const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)

const productRouter = require('./routes/products')
app.use('/products', productRouter)

app.listen(process.env.PORT || 4000, () => console.log('Server started'))