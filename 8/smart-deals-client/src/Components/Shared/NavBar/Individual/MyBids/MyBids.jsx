import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { use } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../../../../Context/AuthContext";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const { user } = use(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:5000/bids?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [user]);

  const handleCancel = (bidId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        fetch(`http://localhost:5000/bids/${bidId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainingBids = bids.filter((bid) => bid._id !== bidId);
              setBids(remainingBids);
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen pt-14 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-center text-[#1a237e] mb-8">
          My Bids: <span className="text-[#7c4dff]">{bids?.length || 0}</span>
        </h1>

        {/* Table Container */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
          <table className="table w-full border-separate border-spacing-0">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr className="text-gray-600">
                <th className="font-semibold py-4 border-b border-gray-100">
                  SL No
                </th>
                <th className="font-semibold border-b border-gray-100">
                  Product ID
                </th>
                <th className="font-semibold border-b border-gray-100">
                  My Info
                </th>
                <th className="font-semibold border-b border-gray-100">
                  Bid Price
                </th>
                <th className="font-semibold border-b border-gray-100">
                  Status
                </th>
                <th className="font-semibold text-center border-b border-gray-100">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bids?.map((bid, index) => (
                <tr
                  key={bid._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="font-medium text-gray-700 border-b border-gray-50">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>

                  {/* Product ID Column */}
                  <td className="border-b border-gray-50">
                    <div className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
                      {bid.product}
                    </div>
                  </td>

                  {/* Buyer Info Column (Jordan Smith) */}
                  <td className="border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-9 h-9 rounded-full bg-gray-200 ring-1 ring-gray-100">
                          <img src={bid.buyer_image} alt={bid.buyer_name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">
                          {bid.buyer_name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {bid.buyer_email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price Column */}
                  <td className="border-b border-gray-50 font-bold text-[#1a237e]">
                    ${bid.bid_price.toLocaleString()}
                  </td>

                  {/* Status Column */}
                  <td className="border-b border-gray-50">
                    <span
                      className={`badge w-[100px] border-none text-white text-[10px] font-bold px-3 py-2 uppercase ${
                        bid.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-[#ffc107]"
                      }`}
                    >
                      {bid.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="text-center border-b border-gray-50">
                    <button
                      onClick={() => handleCancel(bid._id)}
                      disabled={bid.status === "confirmed"}
                      className="hover:text-white btn btn-xs btn-outline border-red-400 text-red-500 hover:bg-red-500 hover:border-red-500 normal-case rounded-md px-3"
                    >
                      Cancel Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {(!bids || bids.length === 0) && (
            <div className="text-center py-16 text-gray-400 font-medium italic">
              No bids found in your history.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBids;
