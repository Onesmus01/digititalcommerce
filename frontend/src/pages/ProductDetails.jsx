import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Context } from "@/context/ProductContext";
import displayKESCurrency from "@/helpers/displayCurrency";
import addToCart from "@/helpers/addToCart";

const ProductDetails = () => {
  const { backendUrl, toast, fetchUserAddToCart } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImage, setZoomImage] = useState(false);
  const [zoomCoordinate, setZoomCoordinate] = useState({ x: 0, y: 0 });

  const productImageLoading = new Array(4).fill(null);

  /* ================= FETCH PRODUCT ================= */
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendUrl}/product/get-product-details/${id}`
      );
      const resData = await response.json();
      setLoading(false);

      if (response.ok) {
        setData(resData?.data);
        setActiveImage(resData?.data?.productImage?.[0]);
      } else {
        toast.error(resData?.message || "Failed to fetch product");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (id) fetchProductDetails();
  }, [id]);

  /* ================= IMAGE HANDLERS ================= */
  const handleImageHover = (img) => {
    setActiveImage(img);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } =
      e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomCoordinate({ x, y });
  }, []);

  const handleLeaveZoom = () => {
    setZoomImage(false);
  };

  /* ================= CART & BUY ================= */
  const handleAddToCart = async (e) => {
    await addToCart(e, data?._id);
    fetchUserAddToCart();
  };

  const handleBuy = async (e) => {
    await addToCart(e, data?._id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  /* ================= JSX ================= */
  return (
    <div className="container mx-auto p-4">
      <div className="flex md:flex-row flex-col lg:flex-row gap-6 min-h-[200px]">

        {/* IMAGE SECTION */}
        <div className="h-96 flex  flex-col lg:flex-row-reverse gap-4 relative">

          {/* MAIN IMAGE */}
          <div className="relative h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 p-2">
            {loading ? (
              <div className="w-full h-full bg-slate-300 animate-pulse" />
            ) : (
              <img
                src={activeImage}
                alt={data?.productName}
                className="w-full h-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveZoom}
              />
            )}

            {/* ZOOM IMAGE */}
            {zoomImage && activeImage && (
              <div className="hidden lg:block absolute -right-[510px] top-0 min-w-[500px] min-h-[400px] bg-slate-200 p-1 overflow-hidden">
                <div
                  className="w-full h-full scale-150 bg-no-repeat"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundPosition: `${zoomCoordinate.x * 100}% ${zoomCoordinate.y * 100}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="h-full overflow-scroll scrollbar-none flex gap-2 lg:flex-col">
            {loading
              ? productImageLoading.map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-20 bg-slate-200 animate-pulse rounded"
                  />
                ))
              : data?.productImage?.slice(0, 4).map((img) => (
                  <div
                    key={img}
                    className="h-20 w-20 bg-slate-200 rounded p-1 cursor-pointer"
                    onMouseEnter={() => handleImageHover(img)}
                    onClick={() => handleImageHover(img)}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        {loading ? (
          <div className="flex flex-col gap-3 w-full">
            <div className="h-6 bg-slate-200 animate-pulse" />
            <div className="h-8 bg-slate-200 animate-pulse" />
            <div className="h-6 bg-slate-200 animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">

            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
              {data?.brandName}
            </p>

            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>

            <p className="capitalize text-slate-400">{data?.category}</p>

            {/* RATING */}
            <div className="flex text-red-500 gap-1">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
            </div>

            {/* PRICE */}
            <div className="flex gap-3 text-xl font-medium">
              <span className="text-red-600">
                {displayKESCurrency(data?.selling)}
              </span>
              <span className="line-through text-slate-400">
                {displayKESCurrency(data?.price)}
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 my-2">
              <button
                className="border-2 border-red-600 px-4 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white"
                onClick={handleBuy}
              >
                Buy
              </button>

              <button
                className="border-2 border-red-600 px-4 py-1 rounded bg-red-600 text-white hover:bg-white hover:text-red-600"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* DESCRIPTION */}
            <div>
              <p className="font-medium text-slate-600">Description :</p>
              <p>{data?.description}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
