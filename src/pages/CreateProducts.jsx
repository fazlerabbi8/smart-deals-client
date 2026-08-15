import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CreateProducts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const productData = {
      title: form.title.value,
      category: form.category.value,
      price_min: Number(form.price_min.value),
      price_max: Number(form.price_max.value || form.price_min.value),
      condition: form.condition.value,
      usage: form.usage.value,
      image: form.image.value,
      seller_name: form.seller_name.value,
      email: form.email.value,
      seller_contact: form.seller_contact.value,
      seller_image: form.seller_image.value,
      location: form.location.value,
      description: form.description.value,
      created_at: new Date().toISOString(),
      status: "pending",
    };

    axios.post('http://localhost:5000/products', productData)
    .then(data => {
        console.log(data)
        if(data.data.insertedId){
            toast.success("Product created successfully!");
        }
    })

  };

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div>
        <Link to={"/"} className="ml-[42%] mt-1 text-sm text-gray-800">
          ← Back To Products
        </Link>
      </div>

      {/* Heading */}
      <div className="py-2">
        <h1 className="text-center text-3xl font-bold text-[#09213b] md:text-4xl">
          Create <span className="text-purple-600">A Product</span>
        </h1>
      </div>

      {/* Form */}
      <div className="mx-auto mt-6 mb-8 w-11/12 max-w-[700px] bg-white p-6">
        <form onSubmit={handleSubmit}>
          {/* Title + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Yamaha Fz Guitar for Sale"
                className="input input-bordered input-sm w-full text-xs"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Category
              </label>

              <select
                name="category"
                className="select select-bordered select-sm w-full text-xs"
                required
              >
                <option value="">Select a Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Fashion">Fashion</option>
                <option value="Furniture">Furniture</option>
                <option value="Books">Books</option>
                <option value="Sports">Sports</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Min Price You want to Sale ($)
              </label>

              <input
                type="number"
                name="price_min"
                placeholder="e.g. 18.5"
                className="input input-bordered input-sm w-full text-xs"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Max Price You want to Sale ($)
              </label>

              <input
                type="number"
                name="price_max"
                placeholder="Optional (default = Min Price)"
                className="input input-bordered input-sm w-full text-xs"
              />
            </div>
          </div>

          {/* Condition + Usage */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-[11px] text-[#09213b]">
                Product Condition
              </label>

              <div className="flex items-center gap-8">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="condition"
                    value="new"
                    defaultChecked
                    className="radio radio-primary radio-sm"
                  />
                  Brand New
                </label>

                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="condition"
                    value="used"
                    className="radio radio-primary radio-sm"
                  />
                  Used
                </label>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Product Usage time
              </label>

              <input
                type="text"
                name="usage"
                placeholder="e.g. 1 year 3 month"
                className="input input-bordered input-sm w-full text-xs"
              />
            </div>
          </div>

          {/* Product Image */}
          <div className="mt-4">
            <label className="mb-1 block text-[11px] text-[#09213b]">
              Your Product Image URL
            </label>

            <input
              type="url"
              name="image"
              placeholder="https://..."
              className="input input-bordered input-sm w-full text-xs"
              required
            />
          </div>

          {/* Seller Name + Email */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Seller Name
              </label>

              <input
                type="text"
                name="seller_name"
                placeholder="e.g. Artisan Roasters"
                className="input input-bordered input-sm w-full text-xs"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Seller Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="seller@example.com"
                className="input input-bordered input-sm w-full text-xs"
                required
              />
            </div>
          </div>

          {/* Contact + Seller Image */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Seller Contact
              </label>

              <input
                type="text"
                name="seller_contact"
                placeholder="e.g. +1-555-1234"
                className="input input-bordered input-sm w-full text-xs"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#09213b]">
                Seller Image URL
              </label>

              <input
                type="url"
                name="seller_image"
                placeholder="https://..."
                className="input input-bordered input-sm w-full text-xs"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mt-4">
            <label className="mb-1 block text-[11px] text-[#09213b]">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="City, Country"
              className="input input-bordered input-sm w-full text-xs"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="mb-1 block text-[11px] text-[#09213b]">
              Simple Description about your Product
            </label>

            <textarea
              name="description"
              placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough....."
              className="textarea textarea-bordered h-[73px] w-full text-xs"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 h-10 w-full rounded-sm bg-gradient-to-r from-purple-600 to-purple-500 text-sm font-medium text-white hover:from-purple-700 hover:to-purple-600"
          >
            Create A Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;