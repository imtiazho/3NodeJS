import React, { useRef } from "react";
import { HiArrowLeft } from "react-icons/hi";
import BidListForTargetedProduct from "../Components/Shared/NavBar/Individual/BidListForTargetedProduct/BidListForTargetedProduct";

const ProductDetails = () => {
  const bidModalRef = useRef(null);
  const handleOpenBidModal = () => {
    bidModalRef.current.showModal();
  };
  const handleBidForm = (e) => {
    e.preventDefault();
    bidModalRef.current.close();
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:px-24">
      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image and Description */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Product Image */}
          <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-sm">
            <img
              src="https://via.placeholder.com/600"
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Description Card */}
          <div className="card bg-base-100 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Product Description
            </h3>
            <div className="flex justify-between border-b pb-4 mb-4">
              <p className="text-sm">
                <span className="text-primary font-bold">Condition :</span> New
              </p>
              <p className="text-sm">
                <span className="text-primary font-bold">Usage Time :</span> 3
                Month
              </p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              It Is A Long Established Fact That A Reader Will Be Distracted By
              The Readable Content Of A Page When Looking At Its Layout... [Your
              description text here]
            </p>
          </div>
        </div>

        {/* Right Column: Product Info and Seller Details */}
        <div className="lg:col-span-7 space-y-4">
          {/* Back Button and Title */}
          <button className="btn btn-ghost btn-sm gap-2 normal-case text-slate-700 px-0 hover:bg-transparent">
            <HiArrowLeft /> Back To Products
          </button>

          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
            Yamaha Fz Guitar For Sale
          </h1>
          <div className="badge bg-purple-100 text-primary border-none font-semibold px-4 py-3">
            Art And Hobbies
          </div>

          {/* Pricing Card */}
          <div className="card bg-base-100 shadow-sm p-6">
            <h2 className="text-3xl font-bold text-green-500">$22.5 - 30</h2>
            <p className="text-gray-400 text-sm">Price starts from</p>
          </div>

          {/* Product Meta Card */}
          <div className="card bg-base-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Product Details
            </h3>
            <p className="text-sm text-slate-700">
              <strong>Product ID:</strong> 68f753ae2174ca368ec882f4
            </p>
            <p className="text-sm text-slate-700">
              <strong>Posted:</strong> 10/19/2024
            </p>
          </div>

          {/* Seller Info Card */}
          <div className="card bg-base-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Seller Information
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-12">
                  <span className="text-xs">SC</span>
                </div>
              </div>
              <div>
                <p className="font-bold text-slate-900">Sara Chen</p>
                <p className="text-xs text-gray-400">crafts.by.sara@shop.net</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm">
                <strong>Location:</strong> Los Angeles, CA
              </p>
              <p className="text-sm">
                <strong>Contact:</strong> sara.chen_contact
              </p>
              <p className="text-sm flex items-center gap-2">
                <strong>Status:</strong>
                <span className="badge badge-warning badge-sm font-bold">
                  On Sale
                </span>
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleOpenBidModal}
            className="btn w-full border-none text-white text-lg normal-case bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 shadow-lg mt-4 h-14"
          >
            I Want Buy This Product
          </button>
        </div>
      </div>

      <div>
        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box max-w-2xl bg-white p-8 rounded-2xl">
            {/* Modal Header */}
            <h3 className="font-bold text-2xl text-center text-[#001d3d] mb-8">
              Give Seller Your Offered Price
            </h3>

            {/* Bid Form */}
            <form onSubmit={handleBidForm} method="dialog" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Buyer Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-[#001d3d]">
                      Buyer Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="input input-bordered w-full focus:border-[#8b5cf6] focus:outline-none placeholder:text-gray-300"
                    
                  />
                </div>

                {/* Buyer Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-[#001d3d]">
                      Buyer Email
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full focus:border-[#8b5cf6] focus:outline-none placeholder:text-gray-300"
                    
                  />
                </div>
              </div>

              {/* Buyer Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-[#001d3d]">
                    Buyer Image URL
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://...your_img_url"
                  className="input input-bordered w-full focus:border-[#8b5cf6] focus:outline-none placeholder:text-gray-300"
                />
              </div>

              {/* Place your Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-[#001d3d]">
                    Place your Price
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Artisan Roasters"
                  className="input input-bordered w-full focus:border-[#8b5cf6] focus:outline-none placeholder:text-gray-300"
                  
                />
              </div>

              {/* Contact Info */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-[#001d3d]">
                    Contact Info
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. +1-555-1234"
                  className="input input-bordered w-full focus:border-[#8b5cf6] focus:outline-none placeholder:text-gray-300"
                  
                />
              </div>

              {/* Modal Actions */}
              <div className="modal-action flex justify-end gap-3 mt-10">
                <input value="Submit Bid"
                  type="submit"
                  className="btn bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-none px-8 shadow-md"
                />
              </div>
            </form>
          </div>
        </dialog>
      </div>

      <BidListForTargetedProduct></BidListForTargetedProduct>
    </div>
  );
};

export default ProductDetails;
