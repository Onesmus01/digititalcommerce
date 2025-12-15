
import Product from '../models/productModel.js';
export const uploadProduct = async (req,res)=> {
    try {
        let {
        productName,
        brandName,
        category,
        productImage,
        description,
        price,
        selling
        }=req.body;

        productName = productName.trim();
        description=description.trim();
        brandName=brandName.trim();
        category=category.trim();
        let parsedPrice=Number(price);
        let parsedSelling=Number(selling);

            let images = [];
            try {
            images = typeof productImage === 'string' ? JSON.parse(productImage) : productImage;
            if (!Array.isArray(images)) images = [images];
            } catch (err) {
            images = [productImage];
            }

        if(!productName || !parsedPrice || !parsedSelling){
            return res.status(400).json({message:"Required fields are missing"})
        }

        const newProduct = new Product({
            productName,
            brandName,
            category,
            productImage,
            description,
            price:parsedPrice,
            selling:parsedSelling
        });
        const savedProduct = await newProduct.save();
        return res.status(201).json({message:"Product uploaded successfully",data:savedProduct});

    } catch (error) {
        return res.status(500).json({message:error.message});
        console.log("Upload product error:",error);           
    }
}