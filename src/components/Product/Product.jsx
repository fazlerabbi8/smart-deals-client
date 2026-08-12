import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const {_id, title, price_min, price_max, image } = product;

  return (
    <div className="card bg-base-100 shadow-sm px-4">
      <figure>
        <img
          className="w-full h-72 object-cover"
          src={image}
          alt={title}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>

        <p>
          Price: {price_min} - {price_max}
        </p>

        <div className="card-actions justify-end">
          <Link to={`/product_details/${_id}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;