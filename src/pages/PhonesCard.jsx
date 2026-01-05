
export default function ProductCard({ product }) {
  if (!product) {
    return (
      <div className="flex items-center justify-center p-4 border rounded-lg bg-white">
        <div className="text-sm text-gray-500">No product data</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 bg-white">
      
      <img
        src={product.image}
        alt=""
        className="w-32 h-32 object-cover mx-auto sm:mx-0"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
          <span className="line-through text-gray-400 text-sm">
            ${product.oldPrice}
          </span>
        </div>

        <div className="text-sm text-gray-500 mt-1">
          ⭐ {product.rating} · {product.orders} orders · 
          <span className="text-green-600"> Free Shipping</span>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <button className="mt-2 text-blue-600 text-sm">
          View details
        </button>
      </div>

      {/* Wishlist */}
      <button className="self-start text-gray-400 hover:text-red-500">
        ❤
      </button>
    </div>
  );
}
