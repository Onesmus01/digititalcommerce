import React from 'react'
import Header from'@/components/Header.jsx'
import CategoryList from '@/components/CategoryList.jsx'
import BannerProduct from '@/components/BannerProduct.jsx'
const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
    </div>
  )
}

export default Home