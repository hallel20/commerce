import { Trash2, Plus, Minus } from 'lucide-react';
import { useStore } from '../lib/store';
import { formatPrice } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useStore();

  // const total = cart.reduce((sum, item) => sum + item.product!.price * item.quantity, 0);
  const total = 12;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex items-center">
                      <img
                        src={
                          item.product?.images
                            ? item.product.images.length > 0
                              ? "/" + item.product.images[0].url
                              : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
                            : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60"
                        }
                        alt={item.product?.name}
                        className="h-24 w-24 object-cover rounded-md"
                      />
                      <div className="ml-6 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.product?.name}
                          </h3>
                          <p className="text-lg font-medium text-gray-900">
                            {formatPrice(10 * item.quantity)}
                            {/* {formatPrice(item.product!.price * item.quantity)} */}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="p-1 rounded-md text-gray-400 hover:text-gray-500 disabled:opacity-50"
                            >
                              <Minus className="h-5 w-5" />
                            </button>
                            <span className="text-gray-600">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 rounded-md text-gray-400 hover:text-gray-500"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">
                      {formatPrice(total)}
                    </dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">Free</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {formatPrice(total)}
                    </dd>
                  </div>
                </dl>
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}