import express from'express'
import { createProduct, getAllProducts, getProductById } from '../controllers/product.controller.js'
const productRoutes=express.Router()
productRoutes.post('/',createProduct)
productRoutes.get('/getAll',getAllProducts)
productRoutes.get('/getOne/:id',getProductById)
export default productRoutes
