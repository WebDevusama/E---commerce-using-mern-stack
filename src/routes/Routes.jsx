import Home from "../pages/Home.jsx";
import Products from "../pages/ProductPage.jsx";
import Profile from "../pages/Profile.jsx";
// import FilterSidebar from '../pages/FilterSidebar';

import { Routes, Route } from "react-router-dom";

export default function Routing() {
  return (
    <>
      
      <div className="min-h-screen flex flex-col">
        <main className="grow">
      
      

      <Routes>
        
        <Route path="/" element={<Home />} />
        
        <Route path="/productPage" element={<Products />}  />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/FilterSidebar" element={<FilterSidebar />} /> */}
        
      </Routes>
      
      
        </main>
      </div>
    </>
  );
}
