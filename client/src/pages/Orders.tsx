import React from 'react';
import { format } from 'date-fns';
import { Package, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const orders = [
  {
    id: '1',
    date: new Date('2024-03-10'),
    total: 299.99,
    status: 'Delivered',
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
      },
    ],
  },
  {
    id: '2',
    date: new Date('2024-03-08'),
    total: 229.98,
    status: 'Processing',
    items: [
      {
        id: '2',
        name: 'Smart Watch Pro',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
      },
      {
        id: '3',
        name: 'Organic Cotton T-Shirt',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
      },
    ],
  },
];

export function Orders() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on {format(order.date, 'MMMM d, yyyy')}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    <Package className="h-4 w-4 mr-1.5" />
                    {order.status}
                  </span>
                  <Link
                    to={`/orders/${order.id}/invoice`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="h-5 w-5 mr-1.5" />
                    Invoice
                  </Link>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}