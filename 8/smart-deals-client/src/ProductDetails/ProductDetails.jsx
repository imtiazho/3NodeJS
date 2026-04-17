import React, { use, useEffect, useRef, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import BidListForTargetedProduct from "../Components/Shared/NavBar/Individual/BidListForTargetedProduct/BidListForTargetedProduct";
import { useLoaderData } from "react-router";
import productPhoto from "../assets/thumbnail-details.png";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContext";

const ProductDetails = () => {
  const bids = useLoaderData();
  const [allbids, setBids] = useState([]);
  const { user } = use(AuthContext);
  const bidModalRef = useRef(null);
  const handleOpenBidModal = () => {
    bidModalRef.current.showModal();
  };

  useEffect(() => {
    fetch(`http://localhost:5000/bids/by-product/${bids._id}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [bids]);

  const handleBidForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const price = e.target.price.value;
    const contact = e.target.contact.value;
    // console.log(name, photo, price, email, contact);

    // Add to database
    const newBid = {
      product: bids?._id,
      buyer_image: photo,
      buyer_name: name,
      buyer_contact: contact,
      buyer_email: email,
      bid_price: price,
      status: "pending",
    };

    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          newBid._id = data.insertedId;
          const newBids = [...allbids, newBid];
          setBids(newBids);
          Swal.fire({
            title: "Posted",
            text: "Your bid has been placed!",
            icon: "success",
          });
          bidModalRef.current.close();
        }
      });
  };

  const handleBidAccept = (id) => {
    fetch(`http://localhost:5000/bids/${id}/status`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const updateList = allbids.map((bid) =>
            bid._id === id ? { ...bid, status: "confirmed" } : bid,
          );
          setBids(updateList);
          Swal.fire({
            title: "Success!",
            text: "You accept this bid",
            icon: "success",
            timer: 1500,
          });
        }
      });
  };
  const handleBidReject = (id) => {
    console.log(id);
  };

  useEffect(() => {
    window.scrollTo({
      top: "2rem",
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:px-24">
      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image and Description */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Product Image */}
          <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-sm">
            <img
              src={productPhoto}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Description Card */}
          <div className="card bg-base-100 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              {bids?.description}
            </h3>
            <div className="flex justify-between border-b pb-4 mb-4">
              <p className="text-sm">
                <span className="text-primary font-bold">Condition :</span>
                {bids?.condition}
              </p>
              <p className="text-sm">
                <span className="text-primary font-bold">Usage Time :</span>{" "}
                {bids?.usage}
              </p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {bids?.description}
            </p>
          </div>
        </div>

        {/* Right Column: Product Info and Seller Details */}
        <div className="lg:col-span-7 space-y-4">
          {/* Back Button and Title */}
          <button className="btn btn-sm gap-2 normal-case text-slate-700 px-0 hover:bg-transparent">
            <HiArrowLeft /> Back To Products
          </button>

          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
            {bids?.title}
          </h1>
          <div className="badge bg-purple-100 text-primary border-none font-semibold px-4 py-3">
            {bids?.category}
          </div>

          {/* Pricing Card */}
          <div className="card bg-base-100 shadow-sm p-6">
            <h2 className="text-3xl font-bold text-green-500">
              ${bids?.price_min} - ${bids?.price_max}
            </h2>
            <p className="text-gray-400 text-sm">Price starts from</p>
          </div>

          {/* Product Meta Card */}
          <div className="card bg-base-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Product Details
            </h3>
            <p className="text-sm text-slate-700">
              <strong>Product ID:</strong> {bids?._id}
            </p>
            <p className="text-sm text-slate-700">
              <strong>Posted:</strong> {bids?.created_at}
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
                  <img src={bids?.image} alt="" />
                </div>
              </div>
              <div>
                <p className="font-bold text-slate-900">{bids?.seller_name}</p>
                <p className="text-xs text-gray-400">{bids?.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm">
                <strong>Location:</strong> {bids?.AuthContextlocation}
              </p>
              <p className="text-sm">
                <strong>Contact:</strong> {bids?.seller_contact}
              </p>
              <p className="text-sm flex items-center gap-2">
                <strong>Status:</strong>
                <span className="badge badge-warning badge-sm font-bold">
                  {bids?.status == "pending" ? "On Sale" : "Stock Out"}
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
            <form
              onSubmit={handleBidForm}
              method="dialog"
              className="space-y-6"
            >
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
                    name="name"
                    defaultValue={user?.displayName}
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
                    name="email"
                    defaultValue={user?.email}
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
                  type="text"
                  name="photo"
                  defaultValue={user?.photoURL}
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
                  type="number"
                  name="price"
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
                  name="contact"
                  placeholder="e.g. +1-555-1234"
                  className="input input-bordered w-full focus:border-[#8b5cf6] focus:outline-none placeholder:text-gray-300"
                />
              </div>

              {/* Modal Actions */}
              <div className="modal-action flex justify-end gap-3 mt-10">
                <input
                  value="Submit Bid"
                  type="submit"
                  className="btn bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-none px-8 shadow-md"
                />
              </div>
            </form>
          </div>
        </dialog>
      </div>
      {bids.email == user.email && (
        <BidListForTargetedProduct
          props={{ allbids, handleBidAccept, handleBidReject }}
        ></BidListForTargetedProduct>
      )}
    </div>
  );
};

export default ProductDetails;
