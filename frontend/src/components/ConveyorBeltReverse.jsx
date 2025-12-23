import React, { useState, useEffect } from "react";
import fetchCategoryWiseProducts from "@/helpers/fetchCategoryWiseProducts.js";

const ConveyorBeltReverse = ({ category }) => {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch products for the given category
  const fetchData = async () => {
    try {
      const res = await fetchCategoryWiseProducts(category);
      setData(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setData([]);
    }
  };

  // Check screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    fetchData();
  }, [category]);

  // Duplicate items for smooth scroll
  const items = [...data, ...data];

  return (
    <div className="container px-4 mx-auto py-3">
      <div className="relative overflow-hidden rounded shadow-md bg-slate-200 h-26 md:h-36">
        <div
          className="flex gap-4 animate-conveyor-reverse h-full items-center"
          style={{ whiteSpace: "nowrap" }}
        >
          {items.map((product, idx) => (
            <div
              key={idx}
              className={`inline-block flex-shrink-0  bg-slate-200  flex items-center justify-center ${
                isMobile ? "w-36 h-36" : "w-44 h-36"
              }`}
            >
              <img
                src={product.productImage?.[0]}
                alt={product.productName}
                className="object-contain h-3/4 w-full mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes conveyor-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-conveyor-reverse {
            animation: conveyor-reverse 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ConveyorBeltReverse;
