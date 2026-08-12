import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl container mx-auto p-6">
      <Navbar></Navbar>
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
};

export default MainLayout;