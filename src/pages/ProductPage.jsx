import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../components/ui/FilterSidebar";
import ProductCard from "./PhonesCard";
import { useCart } from "../CartContext";

export default function ProductPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        // ⚠️ If you want duplicates for testing, keys must be unique
        const extendedProducts = [...response.data, ...response.data];

        setProducts(extendedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/Cart");
  };

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-gray-600">
          {products.length} items in{" "}
          <span className="font-semibold">Mobile Accessories</span>
        </p>

        <select className="border px-3 py-1 rounded text-sm">
          <option>Featured</option>
          <option>Lowest price</option>
          <option>Highest price</option>
        </select>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`} // ✅ FIXED key issue
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}