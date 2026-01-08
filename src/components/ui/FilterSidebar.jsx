import { useState } from "react";
import "./Sidebar.css"; 

const categories = [
  "Mobile accessory",
  "Electronics",
  "Smartphones",
];

const brands = ["Samsung", "Apple", "Huawei", "Lenovo"];
const ratings = [5, 4, 3];

export default function FilterSidebar({ onFilter }) {
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    brands: [],
    min: "",
    max: "",
    rating: null,
  });

  const toggleBrand = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white px-4 py-2 rounded-full shadow"
        onClick={() => setOpen(true)}
      >
        Filters
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-72 bg-white border-r p-4 space-y-6 transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Category */}
        <div>
          <h4 className="font-semibold mb-2">Category</h4>
          <ul className="space-y-1 text-sm">
            {categories.map((c) => (
              <li
                key={c}
                onClick={() => setFilters((f) => ({ ...f, category: c }))}
                className={`cursor-pointer ${
                  filters.category === c
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-semibold mb-2">Brands</h4>
          {brands.map((b) => (
            <label key={b} className="flex items-center text-sm gap-2">
              <input
                type="checkbox"
                checked={filters.brands.includes(b)}
                onChange={() => toggleBrand(b)}
              />
              {b}
            </label>
          ))}
        </div>

        {/* Price */}
        <div>
          <h4 className="font-semibold mb-2">Price range</h4>
          <div className="flex gap-2">
            <input
              placeholder="Min"
              className="border px-2 py-1 w-full rounded"
              value={filters.min}
              onChange={(e) =>
                setFilters({ ...filters, min: e.target.value })
              }
            />
            <input
              placeholder="Max"
              className="border px-2 py-1 w-full rounded"
              value={filters.max}
              onChange={(e) =>
                setFilters({ ...filters, max: e.target.value })
              }
            />
          </div>
        </div>

        {/* Ratings */}
        <div>
          <h4 className="font-semibold mb-2">Ratings</h4>
          {ratings.map((r) => (
            <label key={r} className="flex items-center text-sm gap-2">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === r}
                onChange={() => setFilters({ ...filters, rating: r })}
              />
              ⭐ {r} & up
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            className="w-full border rounded py-2 text-sm"
            onClick={() =>
              setFilters({
                category: "",
                brands: [],
                min: "",
                max: "",
                rating: null,
              })
            }
          >
            Reset
          </button>

          <button
            className="w-full bg-blue-600 text-white rounded py-2 text-sm"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </aside>
    </>
  );
}
