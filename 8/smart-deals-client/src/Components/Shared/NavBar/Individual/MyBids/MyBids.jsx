import React from "react";
import { useLoaderData } from "react-router";
import productPlaceHolder from "../../../../../assets/thumbnail-card.png";
import placeHolderImage from "../../../../../assets/thumb-profile.png";

const MyBids = () => {
  const bids = useLoaderData();
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
                  Product
                </th>
                <th className="font-semibold border-b border-gray-100">
                  Seller
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
                    {index + 1}
                  </td>

                  {/* Product Info Column */}
                  <td className="border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                        <img
                          src={productPlaceHolder}
                          alt="product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">
                          {bid.product_name || "Orange Juice"}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          ${bid.original_price || "22.5"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Seller Info Column */}
                  <td className="border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full bg-gray-200">
                          <img src={placeHolderImage} alt="seller" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">
                          {bid.seller_name || "Sara Chen"}
                        </div>
                        <div className="text-xs text-gray-400 lowercase">
                          {bid.seller_email || "crafts.by.sara@shop.net"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price Column */}
                  <td className="border-b border-gray-50 font-bold text-gray-900">
                    ${bid.bid_price}
                  </td>

                  {/* Status Column */}
                  <td className="border-b border-gray-50">
                    <span className="badge w-[100px] bg-[#ffc107] border-none text-white text-[10px] font-bold px-3 py-2 uppercase">
                      {bid.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="text-center border-b border-gray-50">
                    <button className="hover:text-white btn btn-xs btn-outline border-orange-400 text-orange-500 hover:bg-orange-500 hover:border-orange-500 normal-case rounded-md px-3">
                      Remove Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {(!bids || bids.length === 0) && (
            <div className="text-center py-16 text-gray-400 font-medium">
              You haven't placed any bids yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBids;
