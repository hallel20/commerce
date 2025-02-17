import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Shirt, Watch, Headphones, Package } from 'lucide-react';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Laptop,
    description: 'Computers, phones, and other electronic devices',
    color: 'bg-blue-500',
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: Shirt,
    description: 'T-shirts, pants, and other apparel',
    color: 'bg-green-500',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Watch,
    description: 'Watches, jewelry, and other accessories',
    color: 'bg-purple-500',
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: Headphones,
    description: 'Headphones, speakers, and audio equipment',
    color: 'bg-red-500',
  },
  {
    id: 'other',
    name: 'Other',
    icon: Package,
    description: 'Other miscellaneous items',
    color: 'bg-gray-500',
  },
];

export default function Categories() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className={`p-6 ${category.color} text-white`}>
                  <Icon className="h-12 w-12" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-gray-500">{category.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}