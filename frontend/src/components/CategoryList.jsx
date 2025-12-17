import React, { useEffect, useState, useContext } from 'react'
import { Context } from '@/context/ProductContext.jsx'
import {Link} from 'react-router-dom'


const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const { toast, backendUrl } = useContext(Context)
  const [loading, setLoading] = useState(false)

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${backendUrl}/product/get-product-category`, {
        method: 'GET',
        credentials: 'include',
      })
      const responseData = await response.json()

      if (responseData.success) {
        setCategoryProduct(responseData.data || [])
      }
    } catch (error) {
      toast.error('Error fetching categories')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="flex cursor-pointer items-center gap-4 overflow-x-auto">
        {categoryProduct.length > 0 ? (
          categoryProduct.map((cat, index) => (
            <Link  to={'/product-category'+cat?.category} key={index} className="flex-shrink-0 text-center">
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white overflow-hidden flex items-center justify-center border">
                <img
                  src={cat.productImage}
                  alt={cat.category}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm md:text-base mt-1 capitalize">
                {cat.category}
              </p>
            </Link>
          ))
        ) : (
          <p>No Categories Found</p>
        )}
      </div>
    </div>
  )
}

export default CategoryList
