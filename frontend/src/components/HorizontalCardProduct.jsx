import React, { useState, useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import fetchCategoryWiseProducts from "@/helpers/fetchCategoryWiseProducts.js";
import displayKESCurrency from "@/helpers/displayCurrency.js";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const railRef = useRef(null);

  const skeletons = new Array(6).fill(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProducts(category);
      setData(categoryProduct?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollLeft = () => {
    railRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    railRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section className="container mx-auto px-4 my-3 relative">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-wide text-darkColor">
          {heading}
        </h2>
        <span className="text-sm text-lightColor hover:underline cursor-pointer">
          View all
        </span>
      </div>

      {/* SCROLL BUTTONS */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-darkColor p-2 rounded-full shadow hover:bg-slate-100 z-10"
      >
        <FaAngleLeft size={18} />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-darkColor p-2 rounded-full shadow hover:bg-slate-100 z-10"
      >
        <FaAngleRight size={18} />
      </button>

      {/* PRODUCT RAIL */}
      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto scrollbar-none pb-2 scroll-smooth"
      >
        {/* SKELETON */}
        {loading &&
          skeletons.map((_, i) => (
            <div
              key={i}
              className="min-w-[300px] h-[140px] rounded-xl border bg-white animate-pulse flex"
            >
              <div className="w-28 h-full bg-slate-300 flex items-center justify-center rounded-l-xl" />
              <div className="flex-1 p-3 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-4/5" />
                <div className="h-3 bg-slate-100 rounded w-3/5" />
                <div className="h-6 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}

        {/* PRODUCTS */}
       {/* PRODUCTS */}
{!loading &&
  data.map((product) => (
    <div
      key={product._id}
      className="group min-w-[350px] h-[160px] rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex"
    >
      {/* LEFT SIDE IMAGE */}
      <div className="w-1/2 h-full bg-slate-300 flex items-center justify-center overflow-hidden p-2 rounded-l-xl">
        <img
          src={product?.productImage?.[0]}
          alt={product?.productName}
          className="h-32 w-32 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* RIGHT SIDE INFO */}
      <div className="flex-1 bg-white p-3 overflow-hidden rounded-r-xl flex flex-col justify-between">
        <div>
          <p className="text-sm md:text-base font-semibold text-darkColor truncate">
            {product?.productName}
          </p>
          <p className="text-[12px] md:text-sm text-lightColor capitalize mt-1">
            {product?.category}
          </p>
          <p className="text-sm font-bold text-shop_light_green mt-2">
            {displayKESCurrency(product?.selling)}
          </p>
        </div>
        <button className="mt-2 w-3/4 bg-shop_dark_green text-white text-xs md:text-sm font-semibold py-1 rounded-full hover:bg-shop_light_green transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  ))}

        {/* EMPTY */}
        {!loading && data.length === 0 && (
          <p className="text-sm text-lightColor">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default HorizontalCardProduct;
