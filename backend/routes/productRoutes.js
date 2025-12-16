import express from 'express'
import { uploadProduct,getAllProducts, updateProduct, deleteProduct } from '../controller/productController.js'
import  authToken  from '../middleware/authToken.js'

const productRouter = express.Router()

productRouter.post('/upload-product',authToken,uploadProduct)
productRouter.get('/all-products',authToken,getAllProducts)
productRouter.put('/update-product',authToken,updateProduct)
productRouter.delete('/delete-product',authToken,deleteProduct)
export default productRouter