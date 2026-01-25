export default function ProductCard({ product, onAddToCart }) {
  if (!product) {
    return (
      <div className="flex items-center justify-center p-4 border rounded-lg bg-white">
        <div className="text-sm text-gray-500">No product data</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 bg-white hover:shadow">
      
      {/* Product Image */}
      <img
        src={'./assets/Images/tech/6.png'}
        alt="camera-image"
        className="w-32 h-32 object-cover mx-auto sm:mx-0"
        src={product.image}
        alt={product.title}
        className="w-32 h-32 object-contain mx-auto sm:mx-0"
      />
      

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
        </div>

        {/* ✅ FIXED RATING */}
        <div className="text-sm text-gray-500 mt-1">
          ⭐ {product.rating?.rate} · {product.rating?.count} orders ·
          <span className="text-green-600"> Free Shipping</span>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          High quality product with excellent customer reviews.
        </p>

        <button className="mt-2 text-red-600 text-sm">
          Add-To-cart
        <button
          onClick={onAddToCart}
          className="mt-2 text-red-600 text-sm hover:underline"
        >
          Add to cart
        </button>
      </div>

      {/* Wishlist */}
      <button className="self-start text-gray-400 hover:text-red-500">
        ❤
      </button>
    </div>
  );
}
