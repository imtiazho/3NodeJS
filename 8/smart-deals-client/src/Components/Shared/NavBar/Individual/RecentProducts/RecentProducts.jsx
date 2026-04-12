import React, { use } from "react";
import placeHolderImage from "../../../../../assets/thumbnail-card.png";
import { Link } from "react-router";

const RecentProducts = ({ latestProductPromise }) => {
  const products = use(latestProductPromise);
  console.log(products);

  return (
    <div className="bg-gray-50">
      <section className="py-16 px-4 max-w-7xl mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1e293b]">
            Recent <span className="text-[#8b5cf6]">Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300"
            >
              {/* Product Image Container */}
              <div className="relative p-3">
                <div className="w-full h-52 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={placeHolderImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    //   onError={(e) => {
                    //     e.target.src =
                    //       "https://via.placeholder.com/400x300?text=No+Image";
                    //   }}
                  />
                </div>
                {/* Optional Category Badge */}
                <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm text-[#8b5cf6] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Content Section */}
              <div className="px-5 pb-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#1e293b] line-clamp-1">
                  {item.title} [{" "}
                  {item.condition === "used" ? item.usage : "New"} ]
                </h3>

                <p className="mt-2 text-[#8b5cf6] font-extrabold text-xl">
                  ${item.price_min} - {item.price_max}
                </p>

                {/* View Details Button */}
                <Link
                  to={`/product-details/${item._id}`}
                  className="text-center cursor-pointer mt-6 w-full py-2.5 px-4 border-2 border-purple-100 text-[#8b5cf6] rounded-md font-bold hover:bg-[#8b5cf6] hover:text-white hover:border-[#8b5cf6] transition-all duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-center pb-8">
        <Link
          to="/"
          className="btn border-none text-white px-6 min-h-0 h-10 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default RecentProducts;
