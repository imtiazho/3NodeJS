import React, { useEffect, useState } from "react";

const BidListForTargetedProduct = ({ props }) => {
  const { allbids, handleBidAccept, handleBidReject } = props;
  return (
    <div className="p-8 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-[#001d3d] mb-10">
          Incoming Bids:{" "}
          <span className="text-[#8b5cf6]">
            {allbids.length.toString().padStart(2, "0")}
          </span>
        </h2>

        {/* Table Container */}
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg shadow-sm">
          <table className="table w-full">
            {/* Table Header */}
            <thead className="bg-gray-50/50">
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="font-semibold py-4">SL</th>
                <th className="font-semibold py-4">Buyer Information</th>
                <th className="font-semibold py-4 text-center">Bid Amount</th>
                <th className="font-semibold py-4 text-center">Status</th>
                <th className="font-semibold py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {allbids.map((bid, index) => (
                <tr
                  key={bid._id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-50"
                >
                  <td className="font-bold text-[#001d3d] py-5">{index + 1}</td>

                  {/* Buyer Info */}
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
                        <img
                          src={bid.buyer_image}
                          alt={bid.buyer_name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[#001d3d]">
                          {bid.buyer_name}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          {bid.buyer_email} • {bid.buyer_contact}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="text-center py-5">
                    <span className="font-bold text-[#8b5cf6] text-lg">
                      ${bid.bid_price}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="text-center py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        bid.status === "pending"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {bid.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        disabled={bid.status === "confirmed"}
                        onClick={() => handleBidAccept(bid._id)}
                        className="btn btn-sm btn-outline border-green-500 text-green-600 hover:bg-green-600 hover:text-white capitalize rounded-md px-4"
                      >
                        Accept
                      </button>
                      <button
                        disabled={bid.status === "confirmed"}
                        onClick={() => handleBidReject(bid._id)}
                        className="btn btn-sm btn-outline border-red-400 text-red-500 hover:bg-red-500 hover:text-white capitalize rounded-md px-4"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BidListForTargetedProduct;
