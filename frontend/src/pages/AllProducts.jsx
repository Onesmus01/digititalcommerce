import React,{useState} from 'react'
import UploadProduct from '@/components/UploadProduct.jsx'
const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  return (
    <div>
      <div className="flex justify-between items-center bg-white rounded-3xl shadow-xl border border-slate-200 p-6 mb-6">
        <h2 className='font-bold text-lg '>All Products </h2>
        <button onClick={()=>setOpenUploadProduct(true)} className='border py-1 px-4 items-center bg-blue-500  text-white border-blue-500 hover:border-white rounded-full hover:bg-green-500 hover:text-white '>Upload Product</button>
      </div>

      {/* uplaod product modal */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)}/>
        )
      }
    </div>
  )
}

export default AllProducts
