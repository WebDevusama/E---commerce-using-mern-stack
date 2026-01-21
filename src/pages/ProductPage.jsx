import FilterSidebar from "@/components/ui/FilterSidebar";
import ProductCard from "./PhonesCard";

const products = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: "Go Pro HERO 6K Action Camera - Black",
  price: 2498,
  oldPrice: 3128,
  rating: 4.5,
  orders: 154,
  image: `https://picsum.photos/300?random=${i}`,



  
}));

export default function ProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm text-gray-600">
          12,911 items in <span className="font-semibold">Mobile accessory</span>
        </p>

        <select className="border px-3 py-1 rounded">
          <option>Featured</option>
          <option>Lowest price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar */}
        <FilterSidebar />

        {/* Products */}
        <div className="lg:col-span-3 space-y-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
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
