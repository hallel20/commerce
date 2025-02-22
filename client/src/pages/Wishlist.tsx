import { Trash2, ShoppingCart } from "lucide-react";
import { useStore } from "../lib/store";
import { formatPrice } from "../lib/utils";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist</h1>
      {wishlist.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={
                  item.product?.images
                    ? item.product.images.length > 0
                      ? "/" + item.product.images[0].url
                      : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
                    : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
                }
                alt={item.product?.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.product?.name}
                </h3>
                <p className="mt-2 text-lg font-medium text-gray-900">
                  {formatPrice(item.product!.price)}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => {
                      addToCart({
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        image: item.image,
                      });
                      removeFromWishlist(item.productId);
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <ShoppingCart className="h-5 w-5 mr-1.5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
