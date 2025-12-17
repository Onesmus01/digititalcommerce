

import React, { useState } from 'react'

const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData] = useState(false)
    const [loading,setLoading] = useState(false)

    const isLoading = new Array(13).fill(null)
  return ( 
    <div className='container mx-auto px-4 my-6'>
        <h2 className='text-lg font-semibold py-2'>{heading}</h2>
      <div className="w-full min-w[280px] md:min-w-[320px] max-w[280px] md:max-w-[320px]  h-36 bg-white rounded-sm shadow-md">
        {}
      </div>
    </div>
  )
}

export default HorizontalCardProduct
