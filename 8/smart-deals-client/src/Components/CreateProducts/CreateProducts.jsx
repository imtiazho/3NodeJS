import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const CreateProducts = () => {
  const [condition, setCondition] = useState("brand-new");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form data
    console.log("Product Created");
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <button className="flex items-center gap-2 text-[#001d3d] font-bold mb-4 hover:text-[#8b5cf6] transition-colors">
          <ArrowLeft size={18} />{" "}
          <Link to="/all-products">Back To Products</Link>
        </button>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h1 className="text-4xl font-extrabold text-center text-[#001d3d] mb-10">
            Create <span className="text-[#8b5cf6]">A Product</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                Create A Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProducts;
