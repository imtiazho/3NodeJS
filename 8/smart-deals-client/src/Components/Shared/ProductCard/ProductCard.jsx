import { Link } from "react-router";
import placeHolderImage from "../../../assets/thumbnail-card.png";

const ProductCard = ({ product }) => {
  const {
    title,
    price_min,
    price_max,
    image,
    condition,
    status,
    _id,
    category,
  } = product;

  return (
    <div
      key={_id}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative p-3">
        <div className="w-full h-52 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={placeHolderImage}
            alt={title}
            className="w-full h-full object-cover"
            //   onError={(e) => {
            //     e.target.src =
            //       "https://via.placeholder.com/400x300?text=No+Image";
            //   }}
          />
        </div>
        {/* Optional Category Badge */}
        <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm text-[#8b5cf6] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {status === "pending" ? "On Sale" : status} 
        </span>
      </div>

      {/* Content Section */}
      <div className="px-5 pb-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#1e293b] line-clamp-1">
          {title} 
        </h3>

        <p className="mt-2 text-[#8b5cf6] font-extrabold text-xl">
          ${price_min} - {price_max}
        </p>

        {/* View Details Button */}
        <Link
          to={`/product-details/${_id}`}
          className="text-center cursor-pointer mt-6 w-full py-2.5 px-4 border-2 border-purple-100 text-[#8b5cf6] rounded-md font-bold hover:bg-[#8b5cf6] hover:text-white hover:border-[#8b5cf6] transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
