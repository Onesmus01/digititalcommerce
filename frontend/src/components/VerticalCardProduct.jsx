import React, { useState, useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import fetchCategoryWiseProducts from "@/helpers/fetchCategoryWiseProducts.js";
import displayKESCurrency from "@/helpers/displayCurrency.js";
import { FaStar,FaStarHalfAlt } from "react-icons/fa";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const railRef = useRef(null);

  const skeletons = new Array(6).fill(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchCategoryWiseProducts(category);
      setData(res?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollLeft = () => {
    railRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    railRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="container mx-auto px-4 my-8 relative">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-wide text-darkColor">
          {heading}
        </h2>
        <span className="text-sm text-lightColor hover:text-red-500 hover:underline cursor-pointer transition">
          View all
        </span>
      </div>

      {/* SCROLL BUTTONS */}
      <button
        onClick={scrollLeft}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10
        bg-white text-red-500 p-2 rounded-full shadow-lg
        hover:bg-red-50 hover:scale-110 transition-all"
      >
        <FaAngleLeft />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10
        bg-white text-red-500 p-2 rounded-full shadow-lg
        hover:bg-red-50 hover:scale-110 transition-all"
      >
        <FaAngleRight />
      </button>

      {/* PRODUCT RAIL */}
      <div
        ref={railRef}
        className="flex gap-6 overflow-x-scroll scrollbar-none scroll-smooth pb-4"
      >
        {/* SKELETON */}
        {loading &&
          skeletons.map((_, i) => (
            <div
              key={i}
              className="min-w-[260px] rounded-2xl bg-white border
              animate-pulse overflow-hidden"
            >
              <div className="h-[200px] bg-slate-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-300 rounded w-4/5" />
                <div className="h-3 bg-slate-200 rounded w-2/5" />
                <div className="h-5 bg-slate-300 rounded w-3/5" />
              </div>
            </div>
          ))}

        {/* PRODUCTS */}
        {!loading &&
          data.map((product) => (
            <div
              key={product._id}
              className="group min-w-[260px] max-w-[260px]
              bg-white border border-slate-200 rounded-2xl
              overflow-hidden hover:shadow-xl
              hover:border-red-200 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-[200px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <img
                  src={product?.productImage?.[0]}
                  alt={product?.productName}
                  className="h-44 w-44 object-contain
                  group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                />

                <span className="absolute top-3 left-3
                bg-red-500 text-white text-[10px]
                px-3 py-1 rounded-full tracking-wide shadow">
                  Premium
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-1/2 mx-3  flex flex-col gap-1">
                <p className="text-sm font-semibold text-darkColor truncate">
                  {product?.productName}
                </p>

                <div className="flex items-center justify-between mr-3">
                <p className="text-sm text-lightColor capitalize">
                    <p className='font-bold'>Category</p>
                  
                  {product?.category}
                </p>
                
                
                
                <div className="items-center justify-end gap-1">
                  <p className='text-sm'>Rating</p>
                  <div className="flex">
                    <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500 text-xs" />
                    ))}

                    <FaStarHalfAlt className="text-yellow-500 text-xs" />

                    <span className="ml-1 text-xs font-medium text-darkColor">4.5</span>
                  </div>
                  </div>
                  

                </div>
              </div>

                
                <div className="text-xs text-lighColor line-clamp-1">
                  {product?.description}
                </div>
                <div className="flex overflow-none gap-2 text-center text-sm">
                  <p className=" text-gray-400 line-through font-bold">
                  {displayKESCurrency(product?.price)}
                </p>

                <p className=" font-bold text-red-600">
                  {displayKESCurrency(product?.selling)}
                </p>
                </div>
                

                <button
                  className="mt-1 mx-auto w-1/2 mb-8 bg-red-600 text-white
                  text-sm font-semibold py-1 rounded-full
                  hover:bg-red-500 hover:shadow-md
                  hover:scale-[1.02] active:scale-95
                  transition-all duration-300"
                >
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

export default VerticalCardProduct;
