import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterSidebar from "../components/ui/FilterSidebar";
import ProductCard from "../pages/PhonesCard";
import { useCart } from "../CartContext";

export default function ProductPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        // 🔁 Duplicate products to show MORE items
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

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Bar */}
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* ✅ RESPONSIVE PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={`${product.id}-${Math.random()}`}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
