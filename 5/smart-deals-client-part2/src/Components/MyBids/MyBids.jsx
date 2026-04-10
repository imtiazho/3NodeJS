import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [myBids, setMyBids] = useState([]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:5000/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`
  //       }
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {setMyBids(data)
  //         console.log(data);
  //       });
  //   }
  // }, [user]);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/bids?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((res) => res.json())
        .then((data) => {setMyBids(data)
          console.log(data);
        });
    }
  }, [user]);

  const handleRemoveBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        fetch(`http://localhost:5000/bids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remainigBids = myBids.filter((bid) => bid._id !== id);
              setMyBids(remainigBids);
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
            }
          });
    });
  };
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-[#001d3d] mb-10 text-center">
          My Bids:{" "}
          <span className="text-[#8b5cf6]">
            {myBids.length.toString().padStart(2, "0")}
          </span>
        </h2>

        {/* Table Wrapper */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
          <table className="table w-full border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="bg-transparent py-4 pl-6">SL No</th>
                <th className="bg-transparent py-4">Name</th>
                <th className="bg-transparent py-4">Email</th>
                <th className="bg-transparent py-4">Bid Price</th>
                <th className="bg-transparent py-4 text-center">Status</th>
                <th className="bg-transparent py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {myBids.map((bid, index) => (
                <tr
                  key={bid._id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <td className="pl-6 font-bold text-[#001d3d]">{index + 1}</td>

                  {/* Product Details */}
                  <td className="py-4">{bid?.buyer_name}</td>

                  {/* Seller Details */}
                  <td className="py-4">{bid?.buyer_email}</td>

                  {/* Bid Price */}
                  <td className="py-4 font-bold text-[#001d3d]">
                    ${bid.bid_price}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 text-center">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${bid.status === "pending" ? "bg-amber-400 text-white" : "bg-green-500 text-white"}`}
                    >
                      {bid.status}
                    </span>
                  </td>

                  {/* Remove Action */}
                  <td className="py-4 text-center">
                    <button
                      onClick={() => handleRemoveBid(bid._id)}
                      className="btn btn-sm btn-outline border-orange-400 text-orange-500 hover:bg-orange-50 hover:border-orange-500 rounded-md px-4 capitalize"
                    >
                      Remove Bid
                    </button>
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

export default MyBids;
