import React from "react";
import { Link } from "react-router";

const ProductCard = ({ item }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative p-3">
        <div className="w-full h-52 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
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
          {item.title} [ {item.condition === "used" ? item.usage : "New"} ]
        </h3>

        <p className="mt-2 text-[#8b5cf6] font-extrabold text-xl">
          ${item.price_min} - {item.price_max}
        </p>

        {/* View Details Button */}
        <Link to={`/product-details/${item._id}`} className="mt-6 w-full py-2.5 px-4 border-2 border-purple-100 text-[#8b5cf6] rounded-md font-bold hover:bg-[#8b5cf6] hover:text-white hover:border-[#8b5cf6] transition-all duration-200">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
