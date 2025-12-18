import React from 'react'
import Header from'@/components/Header.jsx'
import CategoryList from '@/components/CategoryList.jsx'
import BannerProduct from '@/components/BannerProduct.jsx'
import HorizontalCardProduct from '@/components/HorizontalCardProduct.jsx'
import VerticalCardProduct from '@/components/VerticalCardProduct.jsx'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular Watches"} />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"mouse"} heading={"Clickable Mouse"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"camera"} heading={"Digital Cameras"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalCardProduct category={"refrigerators"} heading={"High Quality Refrigerators"} />
      <VerticalCardProduct category={"trimmers"} heading={"Fast Trimmers"} />
    </div>
  )
}

export default Home