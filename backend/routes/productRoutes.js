import express from 'express'
import { uploadProduct } from '../controller/productController.js'
import  authToken  from '../middleware/authToken.js'

const productRouter = express.Router()

productRouter.post('/upload-product',authToken,uploadProduct)

export default productRouter