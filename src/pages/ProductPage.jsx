import FilterSidebar from "./FilterSidebar";
import ProductCard from "./PhonesCard";

const products = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: "GoPro HERO 6K Action Camera - Black",
  price: 998,
  oldPrice: 1128,
  rating: 4.5,
  orders: 154,
  image: `https://picsum.photos/200?random=${i}`,
}));

export default function ProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm text-gray-600">
          12,911 items in <span className="font-semibold">Mobile accessory</span>
        </p>

        <div className="flex items-center gap-2">
          <select className="border px-3 py-1 rounded">
            <option>Featured</option>
            <option>Lowest price</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar */}
        <FilterSidebar />

        {/* Products */}
        <div className="lg:col-span-3 space-y-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map((n) => (
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
