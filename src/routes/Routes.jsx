import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/ProductPage";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Dashboard from "../components/ui/Dashborad";

export default function AppRoutes() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/productPage" element={<Products />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
