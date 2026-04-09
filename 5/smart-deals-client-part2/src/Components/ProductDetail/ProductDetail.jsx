import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { MapPin, Calendar, Tag, Phone, Mail, User } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import BidsList from "../BidsList/BidsList";

const ProductDetail = () => {
  const [bids, setBids] = useState([]);
  const { user } = use(AuthContext);
  const product = useLoaderData();
  const { _id: productID } = product;
  const bidModalRef = useRef(null);
  const handleOpenBidModal = () => {
    bidModalRef.current.showModal();
  };
  console.log(product);
  useEffect(() => {
    fetch(`http://localhost:5000/bids/byProduct/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, [productID]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const price = e.target.price.value;
    const newBid = {
      product: productID,
      buyer_name: name,
      buyer_email: email,
      bid_price: price,
      status: "pending",
    };

    // Add Bid to database
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
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });

          // add new bid to current state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div>
      <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Column: Product Image */}
              <div className="bg-gray-100 flex items-center justify-center p-6 lg:p-12">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="rounded-2xl shadow-lg w-full h-auto object-cover max-h-[500px]"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x600?text=Product+Image";
                  }}
                />
              </div>

              {/* Right Column: Details & Seller Info */}
              <div className="p-8 lg:p-12 flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-purple-100 text-[#8b5cf6] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product?.category}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar size={14} />{" "}
                    {new Date(product?.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  {product?.title}
                </h1>

                <div className="flex items-center gap-2 text-[#8b5cf6] mb-6">
                  <span className="text-3xl font-extrabold">
                    ${product?.price_min} - ${product?.price_max}
                  </span>
                </div>

                {/* Product Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Tag className="text-gray-400" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Condition
                      </p>
                      <p className="text-slate-700 font-medium capitalize">
                        {product?.condition}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <MapPin className="text-gray-400" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">
                        Location
                      </p>
                      <p className="text-slate-700 font-medium">
                        {product?.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product?.description}. Used for {product?.usage}.
                  </p>
                </div>

                {/* Seller Card */}
                <div className="mt-auto border-t border-gray-100 pt-8">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Seller Information
                  </h3>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                    <img
                      src={product?.seller_image}
                      alt={product?.seller_name}
                      className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100?text=User";
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 flex items-center gap-1">
                        {product?.seller_name}{" "}
                        <User size={14} className="text-purple-400" />
                      </h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail size={12} /> {product?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleOpenBidModal}
                    className="mt-6 bg-[#8b5cf6] text-white py-4 rounded font-bold hover:bg-[#7c3aed] transition-all shadow-md shadow-purple-200 w-full cursor-pointer"
                  >
                    I want to bid this
                  </button>

                  {/* Modal Body*/}
                  <dialog
                    ref={bidModalRef}
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box max-w-2xl bg-white p-8 rounded-2xl">
                      {/* Modal Header */}
                      <h3 className="font-bold text-2xl text-center text-[#001d3d] mb-8">
                        Give Seller Your Offered Price
                      </h3>

                      {/* Bid Form */}
                      <form
                        onSubmit={handleBidSubmit}
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
                              readOnly
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
                              readOnly
                              className="input input-bordered w-full focus:border-[#8b5cf6] focus:outline-none placeholder:text-gray-300"
                            />
                          </div>
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
                            name="price"
                            placeholder="e.g. Artisan Roasters"
                            className="input input-bordered w-full focus:border-[#8b5cf6] focus:outline-none placeholder:text-gray-300"
                          />
                        </div>

                        {/* Contact Info */}
                        {/* <div className="form-control">
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
                        </div> */}

                        {/* Modal Actions */}
                        {/* <div className="flex justify-end gap-3 mt-10">
                          <button
                            className="btn btn-outline border-[#8b5cf6] text-[#8b5cf6] hover:bg-purple-50 hover:border-[#8b5cf6] px-8"
                            onClick={() => bidModalRef.current.close()}
                          >
                            Cancel
                          </button>

                        </div> */}
                        <input
                          className="btn bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-none px-8 shadow-md"
                          type="submit"
                          value="SUBMIT"
                        />
                      </form>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bids for product */}
      <BidsList bids={bids}></BidsList>
    </div>
  );
};

export default ProductDetail;
