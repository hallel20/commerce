import { FaHeart } from "react-icons/fa6";
import { formatPrice } from "../lib/utils";
import { ShoppingCart } from "lucide-react";
import { useStore } from "../lib/store";
import { isLoggedIn } from "../utils/auth";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useStore();
  const isInWishlist =
    Array.isArray(wishlist.items) &&
    wishlist.items.filter((item) => item.productId === product.id).length > 0;
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
        <img
          // src={product.image}
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
          alt={product.name}
          className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <div className="p-4">
        <div
          className={`flex ${
            isLoggedIn() ? "justify-between" : "justify-start"
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          {isLoggedIn() ? (
            isInWishlist ? (
              <button
                className="text-red-600"
                onClick={() =>
                  removeFromWishlist(product.id)
                }
              >
                <FaHeart />
              </button>
            ) : (
              <button
                className="text-gray-500"
                onClick={() =>
                  addToWishlist({
                    productId: product.id,
                    image: product.image,
                    name: product.name,
                    price: product.price,
                  })
                }
              >
                <FaHeart />
              </button>
            )
          ) : null}
        </div>
        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
