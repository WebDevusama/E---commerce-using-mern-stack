import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

import {
  FaHeart,
  FaBell,
  FaGlobe,
  FaMoon,
  FaSun,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    document.body.classList.toggle("dark", savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark", newMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "ES" : "EN");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      {/* Left: Brand */}
      <div className="navbar-left">
        <div className="brand" onClick={() => navigate("/")}>👜 Brand</div>
      </div>

      {/* Center: Search */}
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
        </select>

        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

      {/* Right: Actions */}
      <div className="navbar-right">
        <div className="nav-item" onClick={() => navigate("/notifications")}>
          <FaBell className="icon" />
          <span>Notifications</span>
        </div>

        <div className="nav-item" onClick={toggleLanguage}>
          <FaGlobe className="icon" />
          <span>{language}</span>
        </div>

        <div className="nav-item" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
          <span>{isDarkMode ? "Light" : "Dark"}</span>
        </div>

        <div className="nav-item" onClick={() => navigate("/location")}>
          <FaMapMarkerAlt className="icon" />
          <span>Location</span>
        </div>

        <div className="nav-item" onClick={() => navigate("/orders")}>
          <FaHeart className="icon" />
          <span>Orders</span>
        </div>

        <div className="nav-item" onClick={() => navigate("/payments")}>
          <FaCreditCard className="icon" />
          <span>Payments</span>
        </div>

        <div
          className="nav-item cart"
          onClick={() => navigate("/cart")}
          role="button"
        >
          <FaShoppingCart className="icon" />
          <span>Cart</span>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="nav-item mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
          <span>Menu</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="nav-item" onClick={() => { navigate("/notifications"); setIsMenuOpen(false); }}>
            <FaBell className="icon" />
            <span>Notifications</span>
          </div>
          <div className="nav-item" onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}>
            <FaGlobe className="icon" />
            <span>{language}</span>
          </div>
          <div className="nav-item" onClick={() => { toggleDarkMode(); setIsMenuOpen(false); }}>
            {isDarkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
            <span>{isDarkMode ? "Light" : "Dark"}</span>
          </div>
          <div className="nav-item" onClick={() => { navigate("/location"); setIsMenuOpen(false); }}>
            <FaMapMarkerAlt className="icon" />
            <span>Location</span>
          </div>
          <div className="nav-item" onClick={() => { navigate("/orders"); setIsMenuOpen(false); }}>
            <FaHeart className="icon" />
            <span>Orders</span>
          </div>
          <div className="nav-item" onClick={() => { navigate("/payments"); setIsMenuOpen(false); }}>
            <FaCreditCard className="icon" />
            <span>Payments</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;