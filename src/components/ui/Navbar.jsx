import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import {
  FaHeart,
  FaBell,
  FaGlobe,
  FaMoon,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingCart,
} from "react-icons/fa";
import {
  FaHeart,
  FaBell,
  FaGlobe,
  FaMoon,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingCart,
} from "react-icons/fa";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      {/* Left: Brand */}
      <div className="navbar-left">
        <div className="brand">👜 Brand</div>
      </div>

      {/* Center: Search Box */}
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />

        <select className="category-select">
          <option>All category</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Books</option>
        </select>

        <button className="search-btn">Search</button>
      </div>

      {/* Right: Icons */}
      <div className="navbar-right">
      <div className="nav-item">
  <FaHeart className="icon" />
  <span>Orders</span>
</div>

<div className="nav-item">
  <FaBell className="icon" />
  <span>Notifications</span>
</div>

<div className="nav-item">
  <FaGlobe className="icon" />
  <span>EN</span>
</div>

<div className="nav-item">
  <FaMoon className="icon" />
  <span>Dark Mode</span>
</div>

<div className="nav-item">
  <FaMapMarkerAlt className="icon" />
  <span>Location</span>
</div>

<div className="nav-item">
  <FaCreditCard className="icon" />
  <span>Payments</span>
</div>

 <div className="nav-item">
      <FaShoppingCart className="icon" />

      <button onClick={() => navigate("/Login")} className="cart-btn">
        <span>Cart</span>

      </button>

    </div>
      <div className="nav-item">
  <FaHeart className="icon" />
  <span>Orders</span>
</div>

<div className="nav-item">
  <FaBell className="icon" />
  <span>Notifications</span>
</div>

<div className="nav-item">
  <FaGlobe className="icon" />
  <span>EN</span>
</div>

<div className="nav-item">
  <FaMoon className="icon" />
  <span>Dark Mode</span>
</div>

<div className="nav-item">
  <FaMapMarkerAlt className="icon" />
  <span>Location</span>
</div>

<div className="nav-item">
  <FaCreditCard className="icon" />
  <span>Payments</span>
</div>

<div className="nav-item">
  <FaShoppingCart className="icon" />
  <span>Cart</span>
</div>




      </div>
    </div>
  );
};

export default Navbar;
