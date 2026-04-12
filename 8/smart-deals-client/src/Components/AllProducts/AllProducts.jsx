import React from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../Shared/ProductCard/ProductCard";
import Footer from "../Shared/Footer/Footer";

const AllProducts = () => {
  const products = useLoaderData();
  
  return (
    <div>
      <section className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              All <span className="text-[#7c4dff]">Products</span>
            </h1>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>

          {/* Empty State */}
          {products?.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
