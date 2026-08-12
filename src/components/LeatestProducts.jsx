import { use } from "react";
import Product from "./Product/Product";

const LeatestProducts = ({ leatestProducts }) => {
  const products = use(leatestProducts);
  console.log(products);
  return (
    <div>
        <div>
            <h3 className="text-3xl text-center font-semibold mt-5 mb-10">Recent Products</h3>
        </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-3">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default LeatestProducts;
