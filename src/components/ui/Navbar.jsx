import { useNavigate } from "react-router-dom";
import "./Navbar.css";

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
       
        
        <div className="nav-item">❤️<span>Orders</span></div>
        <div className="nav-item">🔔<span>Notifications</span></div>
        <div className="nav-item">🌐<span>EN</span></div>
        <div className="nav-item">💡<span>Dark Mode</span></div>
        <div className="nav-item">📍<span>Location</span></div>
        <div className="nav-item">💳<span>Payments</span></div>


      </div>
    </div>
  );
};

export default Navbar;
