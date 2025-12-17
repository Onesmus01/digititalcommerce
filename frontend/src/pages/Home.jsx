import React from 'react'
import Header from'@/components/Header.jsx'
import CategoryList from '@/components/CategoryList.jsx'
import BannerProduct from '@/components/BannerProduct.jsx'
import HorizontalCardProduct from '@/components/HorizontalCardProduct.jsx'
const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpods"} heading={"Top's Airpodes"} />
    </div>
  )
}

export default Home