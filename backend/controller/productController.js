import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import isAdmin from '../helpers/permission.js';
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

        const sessionUserId = req.userId;
         const adminAllowed = await isAdmin(sessionUserId);
        if (!adminAllowed) {
        return res.status(403).json({
            success: false
      });
    }
        


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
            productImage: images,
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

export const getAllProducts = async (req,res)=> {
    try {
        const products = await Product.find().sort({createdAt:-1}); 
        return  res.status(200).json({message:"Products fetched successfully",data:products});
    } catch (error) {
        console.log("Get all products error:",error);           

        return res.status(500).json({message:error.message});
    }
}

export const updateProduct = async (req, res) => {
  try {
    const {
      productId,
      productName,
      brandName = "",
      category = "",
      productImage = [],
      description = "",
      price,
      selling,
    } = req.body

    const sessionUserId = req.userId

    // ADMIN CHECK
    const adminAllowed = await isAdmin(sessionUserId)
    if (!adminAllowed) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      })
    }

    // REQUIRED FIELD CHECK
    if ( !productName || price === undefined || selling === undefined) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      })
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }


    // SANITIZE
    const cleanName = productName.trim()
    const cleanBrand = brandName.trim()
    const cleanCategory = category.trim()
    const cleanDescription = description.trim()

    const parsedPrice = Number(price)
    const parsedSelling = Number(selling)

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedSelling)) {
      return res.status(400).json({
        success: false,
        message: "Price and selling must be valid numbers",
      })
    }

    // NORMALIZE IMAGES
    let images = productImage
    if (typeof images === "string") {
      try {
        images = JSON.parse(images)
      } catch {
        images = [images]
      }
    }
    if (!Array.isArray(images)) images = [images]

    // UPDATE PRODUCT
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        productName: cleanName,
        brandName: cleanBrand,
        category: cleanCategory,
        productImage: images,
        description: cleanDescription,
        price: parsedPrice,
        selling: parsedSelling,
      },
      { new: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    })

  } catch (error) {
    console.error("Update product error:", error)
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const sessionUserId = req.userId

    // ADMIN CHECK
    const adminAllowed = await isAdmin(sessionUserId)
    if (!adminAllowed) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      })
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      })
    }

    const deletedProduct = await Product.findByIdAndDelete(productId)

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    })

  } catch (error) {
    console.error("Delete product error:", error)
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    })
  }
}

