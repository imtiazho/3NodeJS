import React from "react";
import { useLoaderData } from "react-router";
import placeHolderImage from "../../../../../assets/thumbnail-card.png";

const MyProduct = () => {
  const products = useLoaderData();
  return (
    <div className="p-6 bg-gray-50 min-h-screen pt-12 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-center text-black mb-8">
          My Products:{" "}
          <span className="text-[#7c4dff]">{products?.length || 0}</span>
        </h1>

        {/* Table Container */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr className="text-gray-600 border-b border-gray-100">
                <th className="font-semibold py-4">SL No</th>
                <th className="font-semibold">Image</th>
                <th className="font-semibold">Product Name</th>
                <th className="font-semibold">Category</th>
                <th className="font-semibold">Price</th>
                <th className="font-semibold">Status</th>
                <th className="font-semibold text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products?.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-50"
                >
                  <td className="font-medium text-gray-700">{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 bg-gray-100">
                        <img
                          src={placeHolderImage}
                          alt={product.title}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold text-gray-800">
                    {product.title}
                  </td>
                  <td>
                    <span className="text-gray-600">{product.category}</span>
                  </td>
                  <td className="font-bold text-gray-900">
                    ${product.price_min}
                  </td>
                  <td>
                    <span
                      className={`badge border-none px-4 py-3 text-xs font-bold ${
                        product.status === "pending"
                          ? "bg-[#ffc107] text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {product.status === "pending" ? "Pending" : "Sold"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button className="hover:text-white btn btn-sm btn-outline border-purple-300 text-purple-600 hover:bg-purple-600 hover:border-purple-600 normal-case px-4 rounded-md">
                        Edit
                      </button>
                      <button className="hover:text-white btn btn-sm btn-outline border-orange-300 text-orange-500 hover:bg-orange-500 hover:border-orange-500 normal-case px-4 rounded-md">
                        Delete
                      </button>
                      <button
                        disabled={product.status === "sold"}
                        className="hover:text-white btn btn-sm btn-outline border-green-300 text-green-600 hover:bg-green-600 hover:border-green-600 normal-case px-4 rounded-md"
                      >
                        Make Sold
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {(!products || products.length === 0) && (
            <div className="text-center py-12 text-gray-400">
              You haven't added any products yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
