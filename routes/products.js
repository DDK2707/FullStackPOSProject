const express = require('express')
const router = express.Router()
const Product = require('../models/product')

//Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch {
        res.status(500).json({message: err.message})
    }
})

//Get one product
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product)
})

//Create product
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category
    })
    try{
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    }catch{
        res.status(400).json({message: 'Could not add product'})
    }
})

//Update product
router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name
    }
    if (req.body.category != null) {
        res.product.category = req.body.category
    }
    try{
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    }catch{
        res.status(400).json({message: err.message})
    }
})

//Delete product
router.delete('/:id', getProduct, async(req, res) => {
    try{
        await res.product.remove()
        res.json({message: 'Product deleted'})
    }catch{
        return res.status(500).json({message: err.message})
    }
})

async function getProduct(req, res, next) {
    let product
    try{
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({message: 'Product not found'})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
    res.product = product
    next()
}

module.exports = router