import Navbar from "../components/ui/Navbar.jsx";
import Sidebar from "../components/ui/sidebar.jsx";
import Home from "../pages/Home.jsx";
import Products from "../pages/Products.jsx";
import Cart from "../pages/Cart.jsx";
import Orders from "../pages/Orders.jsx";
import Profile from "../pages/Profile.jsx";
import Settings from "../pages/Settings.jsx";
import Categories from "../pages/Categories.jsx";
import { Routes, Route } from "react-router-dom";

export default function Routing() {
  return (
    <>
      <Navbar />
      <Sidebar  user={{ name: "Usama" }} 
      
      
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
