import React from "react";

const BidsList = ({ bids }) => {
  // Sample data array for the bids

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-[#001d3d] mb-10">
          Bids For This Products:{" "}
          <span className="text-[#8b5cf6]">
            {bids.length.toString().padStart(2, "0")}
          </span>
        </h2>

        {/* Table Container */}
        <div className="overflow-x-auto border border-gray-100 rounded-lg shadow-sm">
          <table className="table w-full">
            {/* Table Header */}
            <thead className="bg-gray-50/50">
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="font-semibold py-4">SL No</th>
                <th className="font-semibold py-4">Name</th>
                <th className="font-semibold py-4">Email</th>
                <th className="font-semibold py-4 text-center">Bid Price</th>
                <th className="font-semibold py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bids.map((bid, index) => (
                <tr
                  key={bid.id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-50"
                >
                  <td className="font-bold text-[#001d3d] py-5">{index + 1}</td>

                  {/* Biyer Info */}
                  <td className="py-5">
                    <div className="font-bold text-[#001d3d]">
                      {bid?.buyer_name}
                    </div>
                  </td>

                  {/* Seller Info */}
                  <td className="py-5">
                    <div className="font-bold text-[#001d3d]">
                      {bid?.buyer_email}
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="text-center py-5">
                    <span className="font-bold text-[#001d3d] text-lg">
                      ${bid?.bid_price}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-5">
                    <div className="flex justify-center gap-2">
                      <button className="btn btn-sm btn-outline border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 capitalize rounded-md px-4">
                        Accept Offer
                      </button>
                      <button className="btn btn-sm btn-outline border-orange-400 text-orange-500 hover:bg-orange-50 hover:border-orange-500 capitalize rounded-md px-4">
                        Reject Offer
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

export default BidsList;
