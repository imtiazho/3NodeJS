import React, { use, useEffect, useState } from "react";
import placeHolderImage from "../../../../../assets/thumbnail-card.png";
import { AuthContext } from "../../../../../Context/AuthContext";
import { useRef } from "react";

const MyProduct = () => {
  const [condition, setCondition] = useState("brand-new");
  const [products, setProducts] = useState([]);
  const { user } = use(AuthContext);
  const bidModalRef = useRef(null);
  const handleEdit = (e) => {
    bidModalRef.current.close();
  };
  const handleOpenBidModal = () => {
    bidModalRef.current.showModal();
  };
  useEffect(() => {
    fetch(`http://localhost:5000/all-products?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [user]);

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
                      className={`w-[100px] badge border-none px-4 py-3 text-xs font-bold ${
                        product.status === "pending"
                          ? "bg-[#ffc107] text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {product.status === "pending" ? "Pending" : "Sold"}
                    </span>
                  </td>
                  <td className="text-center">
                    <dialog
                      ref={bidModalRef}
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="text-left bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <h1 className="text-4xl font-extrabold text-center text-[#001d3d] mb-10">
                          Edit Your{" "}
                          <span className="text-[#8b5cf6]"> Product</span>
                        </h1>

                        <form onSubmit={handleEdit} className="">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Title
                                </span>
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Yamaha Fz Guitar for Sale"
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                                required
                              />
                            </div>

                            {/* Category */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Category
                                </span>
                              </label>
                              <select className="select select-bordered w-full focus:outline-[#8b5cf6] font-normal text-gray-400">
                                <option disabled selected>
                                  Select a Category
                                </option>
                                <option>Furniture</option>
                                <option>Electronics</option>
                                <option>Vehicles</option>
                              </select>
                            </div>

                            {/* Min Price */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Min Price You want to Sale ($)
                                </span>
                              </label>
                              <input
                                type="number"
                                placeholder="e.g. 18.5"
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                                required
                              />
                            </div>

                            {/* Max Price */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Max Price You want to Sale ($)
                                </span>
                              </label>
                              <input
                                type="number"
                                placeholder="Optional (default = Min Price)"
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                              />
                            </div>

                            {/* Product Condition (Radios) */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Product Condition
                                </span>
                              </label>
                              <div className="flex gap-6 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="condition"
                                    className="radio radio-primary"
                                    checked={condition === "brand-new"}
                                    onChange={() => setCondition("brand-new")}
                                  />
                                  <span className="label-text font-bold text-gray-700">
                                    Brand New
                                  </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="condition"
                                    className="radio radio-primary"
                                    checked={condition === "used"}
                                    onChange={() => setCondition("used")}
                                  />
                                  <span className="label-text font-bold text-gray-700">
                                    Used
                                  </span>
                                </label>
                              </div>
                            </div>

                            {/* Usage Time */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Product Usage time
                                </span>
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. 1 year 3 month"
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                              />
                            </div>

                            {/* Image URL (Full Width) */}
                            <div className="form-control md:col-span-2">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Your Product Image URL
                                </span>
                              </label>
                              <input
                                type="url"
                                placeholder="https://..."
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                                required
                              />
                            </div>

                            {/* Seller Name */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Seller Name
                                </span>
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Artisan Roasters"
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                                required
                              />
                            </div>

                            {/* Seller Email */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Seller Email
                                </span>
                              </label>
                              <input
                                type="email"
                                placeholder="leli31955@nrlord.com"
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                                required
                              />
                            </div>

                            {/* Contact */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Seller Contact
                                </span>
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. +1-555-1234"
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                                required
                              />
                            </div>

                            {/* Seller Image */}
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Seller Image URL
                                </span>
                              </label>
                              <input
                                type="url"
                                placeholder="https://..."
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                                required
                              />
                            </div>

                            {/* Location (Full Width) */}
                            <div className="form-control md:col-span-2">
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Location
                                </span>
                              </label>
                              <input
                                type="text"
                                placeholder="City, Country"
                                className="input input-bordered w-full focus:outline-[#8b5cf6]"
                                required
                              />
                            </div>

                            {/* Description (Full Width) */}
                            <div className="form-control md:col-span-2 flex flex-col gap-2">
                              {" "}
                              {/* Added md:col-span-2 here */}
                              <label className="label">
                                <span className="label-text font-bold text-gray-600 text-sm">
                                  Simple Description about your Product
                                </span>
                              </label>
                              <textarea
                                className="textarea textarea-bordered h-32 w-full focus:outline-[#8b5cf6]"
                                placeholder="e.g. I bought this product 3 month ago..."
                              ></textarea>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="pt-6">
                            <button className="btn bg-[#8b5cf6] hover:bg-[#7c3aed] text-white w-full border-none text-lg capitalize py-3 h-auto min-h-0 rounded-lg">
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </dialog>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={handleOpenBidModal}
                        className="hover:text-white btn btn-sm btn-outline border-purple-300 text-purple-600 hover:bg-purple-600 hover:border-purple-600 normal-case px-4 rounded-md"
                      >
                        Edit
                      </button>
                      <button className="hover:text-white btn btn-sm btn-outline border-orange-300 text-orange-500 hover:bg-orange-500 hover:border-orange-500 normal-case px-4 rounded-md">
                        Delete
                      </button>
                      <button
                        disabled={product.status === "sold"}
                        className="hover:text-white btn btn-sm btn-outline border-green-300 text-green-600 hover:bg-green-600 hover:border-green-600 normal-case px-4 rounded-md]"
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
