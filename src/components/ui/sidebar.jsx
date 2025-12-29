import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar({ cartCount = 0, user = { name: 'Guest' } }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed((s) => !s)}
          aria-label="Toggle sidebar"
        >
          <span className="chev">{collapsed ? '»' : '«'}</span>
        </button>

        <div className="brand">
          <div className="logo">🛍️</div>
          {!collapsed && (
            <div className="title">
              <strong>My Shop</strong>
              <small className="subtitle">E‑commerce</small>
            </div>
          )}
        </div>
      </div>

      <div className="profile">
        <div className="avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'G'}</div>
        {!collapsed && (
          <div className="user-info">
            <div className="name">{user.name}</div>
            <div className="role">Customer</div>
          </div>
        )}
      </div>

      <nav className="nav">
  


        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="icon">🏠</span>
          {!collapsed && <span className="label">Home</span>}
        </NavLink>

        <NavLink to="/products" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="icon">🛍️</span>
          {!collapsed && <span className="label">Products</span>}
        </NavLink>

        <NavLink to="/categories" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="icon">🗂️</span>
          {!collapsed && <span className="label">Categories</span>}
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="icon">📦</span>
          {!collapsed && <span className="label">Orders</span>}
        </NavLink>

        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="icon">🛒</span>
          {!collapsed && <span className="label">Cart</span>}
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="icon">👤</span>
          {!collapsed && <span className="label">Profile</span>}
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <span className="icon">⚙️</span>
          {!collapsed && <span className="label">Settings</span>}
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        {!collapsed && <button className="help">Help & Support</button>}
        <button className="logout">Log out</button>
      </div>
    </aside>
  )
}
