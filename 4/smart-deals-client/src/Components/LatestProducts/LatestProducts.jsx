import React, { use } from "react";
import ProductCard from "../ProductCard/ProductCard";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);

  return (
    <div className="bg-[#F5F5F5]">
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1e293b]">
            Recent <span className="text-[#8b5cf6]">Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <ProductCard key={item._id} item={item}></ProductCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LatestProducts;
