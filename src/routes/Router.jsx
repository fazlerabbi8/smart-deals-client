import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AllProducts from "../pages/AllProducts";
import Home from "../pages/Home";
import MyProducts from "../pages/MyProducts";
import MyBids from "../pages/MyBids";
import CreateProducts from "../pages/CreateProducts";
import Login from "../components/Login";
import Register from "../components/Register";
import Product from "../components/Product/Product";
import ProductDetails from "../components/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: "/allproducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/myproducts",
        element: <MyProducts></MyProducts>
      },
      {
        path: "/mybids",
        element: <MyBids></MyBids>
      },
      {
        path: "/createproducts",
        element: <CreateProducts></CreateProducts>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path:"/product_details/:id",
        element: <ProductDetails></ProductDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
      }
    ],
  },
]);

export default router;