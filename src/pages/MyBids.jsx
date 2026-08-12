import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MyBids = () => {
  const { currentUser } = useContext(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (currentUser?.email) {
      fetch(`http://localhost:5000/bids?email=${currentUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBids(data);
        });
    }
  }, [currentUser?.email]);

  return (
    <div className="w-11/12 mx-auto mt-6">
      {/* Title */}
      <div className="text-center py-2 mb-4">
        <h3 className="text-2xl font-bold">
          My Bids:{" "}
          <span className="text-purple-500">{bids.length}</span>
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  border-blue-400">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>SL No</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Buyer Name</th>
              <th>Offered Price</th>
              <th>Contact Info</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                {/* SL No */}
                <td>{index + 1}</td>

                {/* Buyer Image */}
                <td>
                  <div className="avatar">
                    <div className="w-10 h-10 rounded">
                      <img
                        src={bid.buyerImage}
                        alt={bid.buyerName}
                      />
                    </div>
                  </div>
                </td>

                {/* Product Name */}
                <td className="font-medium">
                  {bid.productTitle}
                </td>

                {/* Buyer Name */}
                <td>{bid.buyerName}</td>

                {/* Offered Price */}
                <td className="font-semibold">
                  ${Number(bid.offeredPrice).toLocaleString()}
                </td>

                {/* Contact */}
                <td>{bid.contactInfo}</td>

                {/* Actions */}
                <td>
                  <button className="btn btn-xs btn-outline btn-primary">
                    View Product
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {bids.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">You haven't placed any bids yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyBids;