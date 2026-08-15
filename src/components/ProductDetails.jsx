import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const ProductDetails = () => {
  const product = useLoaderData();
  const modalRef = useRef(null);
  const [bidsProduct, setBidProduct] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const {
    title,
    price_min,
    price_max,
    image,
    category,
    description,
    condition,
    usage_time,
    _id,
    posted_date,
    seller_name,
    seller_email,
    location,
    contact,
    status,
  } = product;

  const handleOpenModal = () => {
    modalRef.current.showModal();
  };

  const handleCloseModal = () => {
    modalRef.current.close();
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();

    const form = e.target;

    const bidData = {
      buyerName: form.buyerName.value,
      buyerEmail: form.buyerEmail.value,
      buyerImage: form.buyerImage.value,
      offeredPrice: form.offeredPrice.value,
      contactInfo: form.contactInfo.value,
      productId: _id,
      productTitle: title,
    };

    console.log(bidData);

    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bidData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Bids added successfully!");
        }
      });

    handleCloseModal();
  };

useEffect(() =>{
  axios.get(`http://localhost:5000/products/bids/${product._id}`)
  .then(data => {
    console.log(data)
    setBidProduct(data.data)
  })
})



  // useEffect(() => {
  //   fetch(`http://localhost:5000/products/bids/${product._id}`, {
  //     headers:{
  //       authorization : `${currentUser.accessToken}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setBidProduct(data));
  // }, [product._id]);



  return (
    <div>
      {/* PRODUCT DETAILS */}
      <div className="min-h-screen bg-base-200 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="space-y-5">

            <div className="rounded-lg bg-base-100 p-4 shadow-sm">
              <img
                src={image}
                alt={title}
                className="h-[330px] w-full rounded-lg object-cover"
              />
            </div>

            <div className="rounded-lg bg-base-100 p-5 shadow-sm">
              <h2 className="mb-5 text-xl font-bold">
                Product Description
              </h2>

              <div className="mb-4 grid grid-cols-2 border-b pb-3">

                <p>
                  <span className="text-primary">Condition</span> :{" "}
                  <span className="font-medium">
                    {condition || "New"}
                  </span>
                </p>

                <p>
                  <span className="text-primary">Usage Time</span> :{" "}
                  <span className="font-medium">
                    {usage_time || "N/A"}
                  </span>
                </p>

              </div>

              <p className="text-sm leading-5 text-gray-500">
                {description || "No description available."}
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">

            <Link
              to="/"
              className="inline-block text-sm font-medium hover:text-primary"
            >
              ← Back To Products
            </Link>

            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                {title}
              </h1>

              <div className="mt-3">
                <span className="badge badge-secondary">
                  {category}
                </span>
              </div>
            </div>

            {/* PRICE */}
            <div className="rounded-lg bg-base-100 p-5 shadow-sm">

              <h2 className="text-2xl font-bold text-green-600">
                ${price_min} - {price_max}
              </h2>

              <p className="text-sm">
                Price starts from
              </p>

            </div>

            {/* PRODUCT DETAILS */}
            <div className="rounded-lg bg-base-100 p-5 shadow-sm">

              <h2 className="mb-4 text-xl font-bold">
                Product Details
              </h2>

              <div className="space-y-2 text-sm">

                <p>
                  <span className="font-semibold">
                    Product ID:
                  </span>{" "}
                  {_id}
                </p>

                <p>
                  <span className="font-semibold">
                    Posted:
                  </span>{" "}
                  {posted_date || "N/A"}
                </p>

              </div>

            </div>

            {/* SELLER */}
            <div className="rounded-lg bg-base-100 p-5 shadow-sm">

              <h2 className="mb-5 text-xl font-bold">
                Seller Information
              </h2>

              <div className="flex items-center gap-3">

                <div className="avatar placeholder">
                  <div className="w-12 rounded-full bg-neutral text-neutral-content">
                    <span>
                      {seller_name?.charAt(0) || "S"}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold">
                    {seller_name || "Seller"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {seller_email}
                  </p>
                </div>

              </div>

              <div className="mt-4 space-y-2 text-sm">

                <p>
                  <span className="font-semibold">
                    Location:
                  </span>{" "}
                  {location || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">
                    Contact:
                  </span>{" "}
                  {contact || "N/A"}
                </p>

                <p className="flex items-center gap-2">
                  <span className="font-semibold">
                    Status:
                  </span>

                  <span className="badge badge-warning">
                    {status || "On Sale"}
                  </span>
                </p>

              </div>

            </div>

            {/* BUY BUTTON */}
            <button
              className="btn btn-primary w-full text-base font-bold"
              onClick={handleOpenModal}
            >
              I Want Buy This Product
            </button>

          </div>
        </div>

        {/* MODAL */}
        <dialog
          ref={modalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box max-w-2xl">

            <h3 className="text-center text-2xl font-bold">
              Give Seller Your Offered Price
            </h3>

            <form onSubmit={handleSubmitBid}>

              {/* NAME + EMAIL */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="label">
                    <span className="label-text">
                      Buyer Name
                    </span>
                  </label>

                  <input
                    type="text"
                    name="buyerName"
                    placeholder="Your name"
                    defaultValue={
                      currentUser?.displayName || ""
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">
                      Buyer photo
                    </span>
                  </label>

                  <input
                    type="email"
                    name="buyerEmail"
                    placeholder="Your Email"
                    defaultValue={
                      currentUser?.email || ""
                    }
                    readOnly
                    className="input input-bordered w-full"
                    required
                  />
                </div>

              </div>

              {/* IMAGE URL */}
              <div className="mt-3">

                <label className="label">
                  <span className="label-text">
                    Photo
                  </span>
                </label>

                <input
                  type="url"
                  name="buyerImage"
                  defaultValue={currentUser?.photoURL || ""}
                  placeholder="https://...your_img_url"
                  className="input input-bordered w-full"
                  required
                />

              </div>

              {/* OFFERED PRICE */}
              <div className="mt-3">

                <label className="label">
                  <span className="label-text">
                    Place Your Price
                  </span>
                </label>

                <input
                  type="number"
                  name="offeredPrice"
                  placeholder="e.g. 25000"
                  className="input input-bordered w-full"
                  required
                />

              </div>

              {/* CONTACT */}
              <div className="mt-3">

                <label className="label">
                  <span className="label-text">
                    Contact Info
                  </span>
                </label>

                <input
                  type="text"
                  name="contactInfo"
                  placeholder="e.g. +1-555-1234"
                  className="input input-bordered w-full"
                  required
                />

              </div>

              {/* ACTIONS */}
              <div className="modal-action">

                <button
                  type="button"
                  className="btn btn-outline btn-primary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit Bid
                </button>

              </div>

            </form>
          </div>

          {/* BACKDROP */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>

        </dialog>
      </div>


      {/* ================================================= */}
      {/* BIDS FOR THIS PRODUCT */}
      {/* ================================================= */}

      <div className="mx-auto mt-8 max-w-6xl px-4 pb-10">

        <h2 className="mb-5 text-3xl font-bold">
          Bids For This Product:{" "}
          <span className="text-primary">
            {bidsProduct.length.toString().padStart(2, "0")}
          </span>
        </h2>

        <div className="overflow-x-auto rounded-lg bg-base-100 shadow-sm">

          <table className="table">

            {/* TABLE HEAD */}
            <thead>
              <tr>
                <th>SL No</th>
                <th>Product</th>
                <th>Buyer</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>

              {bidsProduct.map((bid, index) => (

                <tr key={bid._id}>

                  {/* SL NO */}
                  <td>
                    {index + 1}
                  </td>


                  {/* PRODUCT */}
                  <td>

                    <div className="flex items-center gap-3">

                      <div className="avatar">

                        <div className="h-10 w-10 rounded">

                          <img
                            src={image}
                            alt={bid.productTitle}
                          />

                        </div>

                      </div>

                      <div>

                        <div className="font-medium">
                          {bid.productTitle}
                        </div>

                        <div className="text-xs text-gray-500">
                          ${price_min}
                        </div>

                      </div>

                    </div>

                  </td>


                  {/* BUYER */}
                  <td>

                    <div className="flex items-center gap-3">

                      <div className="avatar">

                        <div className="h-10 w-10 rounded-full">

                          <img
                            src={bid.buyerImage}
                            alt={bid.buyerName}
                          />

                        </div>

                      </div>

                      <div>

                        <div className="font-medium">
                          {bid.buyerName}
                        </div>

                        <div className="text-xs text-gray-500">
                          {bid.buyerEmail}
                        </div>

                      </div>

                    </div>

                  </td>


                  {/* BID PRICE */}
                  <td>

                    <span className="font-semibold">
                      ${bid.offeredPrice}
                    </span>

                  </td>


                  {/* ACTIONS */}
                  <td>

                    <div className="flex gap-2">

                      <button
                        className="btn btn-xs btn-outline btn-success"
                        onClick={() =>
                          console.log(
                            "Accept",
                            bid._id
                          )
                        }
                      >
                        Accept Offer
                      </button>

                      <button
                        className="btn btn-xs btn-outline btn-error"
                        onClick={() =>
                          console.log(
                            "Reject",
                            bid._id
                          )
                        }
                      >
                        Reject Offer
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {/* NO BIDS */}
          {bidsProduct.length === 0 && (

            <div className="p-10 text-center text-gray-500">
              No bids have been placed for this product yet.
            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;