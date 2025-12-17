import express from 'express'
import getCategoryWiseProduct, { uploadProduct,getAllProducts, updateProduct, deleteProduct, getProductCategory } from '../controller/productController.js'
import  authToken  from '../middleware/authToken.js'

const productRouter = express.Router()

productRouter.post('/upload-product',authToken,uploadProduct)
productRouter.get('/all-products',authToken,getAllProducts)
productRouter.put('/update-product',authToken,updateProduct)
productRouter.delete('/delete-product',authToken,deleteProduct)
productRouter.get('/get-product-category',authToken,getProductCategory)
productRouter.get('/category-product',getCategoryWiseProduct)

export default productRouter