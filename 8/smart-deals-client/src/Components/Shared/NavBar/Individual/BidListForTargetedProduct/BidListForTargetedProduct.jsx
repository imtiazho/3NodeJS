import React from 'react';

const BidListForTargetedProduct = () => {
    const bids = [
    {
      id: 1,
      productName: "Orange Juice",
      originalPrice: 22.5,
      productImage: "https://via.placeholder.com/50",
      sellerName: "Sara Chen",
      sellerEmail: "crafts.by.sara@shop.net",
      sellerImage: "https://via.placeholder.com/40",
      bidPrice: 10,
    },
    {
      id: 2,
      productName: "Orange Juice",
      originalPrice: 22.5,
      productImage: "https://via.placeholder.com/50",
      sellerName: "Sara Chen",
      sellerEmail: "crafts.by.sara@shop.net",
      sellerImage: "https://via.placeholder.com/40",
      bidPrice: 10,
    },
    {
      id: 3,
      productName: "Orange Juice",
      originalPrice: 22.5,
      productImage: "https://via.placeholder.com/50",
      sellerName: "Sara Chen",
      sellerEmail: "crafts.by.sara@shop.net",
      sellerImage: "https://via.placeholder.com/40",
      bidPrice: 10,
    },
  ];

  return (
    <div className="p-8 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-[#001d3d] mb-10">
          Bids For This Products: <span className="text-[#8b5cf6]">{bids.length.toString().padStart(2, '0')}</span>
        </h2>

        {/* Table Container */}
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg shadow-sm">
          <table className="table w-full">
            {/* Table Header */}
            <thead className="bg-gray-50/50">
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="font-semibold py-4">SL No</th>
                <th className="font-semibold py-4">Product</th>
                <th className="font-semibold py-4">Seller</th>
                <th className="font-semibold py-4 text-center">Bid Price</th>
                <th className="font-semibold py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {bids.map((bid, index) => (
                <tr key={bid.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50">
                  <td className="font-bold text-[#001d3d] py-5">{index + 1}</td>
                  
                  {/* Product Info */}
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                        <img src={bid.productImage} alt={bid.productName} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <div className="font-bold text-[#001d3d]">{bid.productName}</div>
                        <div className="text-xs text-gray-400 font-medium">${bid.originalPrice}</div>
                      </div>
                    </div>
                  </td>

                  {/* Seller Info */}
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                        <img src={bid.sellerImage} alt={bid.sellerName} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <div className="font-bold text-[#001d3d]">{bid.sellerName}</div>
                        <div className="text-xs text-gray-400 font-medium">{bid.sellerEmail}</div>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="text-center py-5">
                    <span className="font-bold text-[#001d3d] text-lg">${bid.bidPrice}</span>
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

export default BidListForTargetedProduct;