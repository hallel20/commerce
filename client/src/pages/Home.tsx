import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Truck, Shield, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useStore } from '../lib/store';
// import productsData from '../lib/data/products.json';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Home() {
  const { addToCart, fetchWishlist } = useStore();

  const [products, setProducts] = useState<any[]>()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/products")
        const products = response.data
        setProducts(products)
      } catch (error: any) {
        console.error(error)
        toast.error(error.message)
      }
    }

    fetchWishlist()

    getProducts()
  }, [])

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80"
            alt="Hero background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-6">
              Discover the Latest Trends
            </h1>
            <p className="text-xl mb-8">
              Shop our curated collection of premium products at unbeatable
              prices.
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              description: "On orders over $50",
            },
            {
              icon: Shield,
              title: "Secure Payment",
              description: "100% secure checkout",
            },
            {
              icon: Clock,
              title: "24/7 Support",
              description: "Always here to help",
            },
            {
              icon: TrendingUp,
              title: "Best Deals",
              description: "Competitive prices",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md"
            >
              <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/categories"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            View All
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() =>
                addToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image:
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
                })
              }
            />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Electronics",
              image:
                "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60",
              description: "Latest gadgets and devices",
            },
            {
              name: "Clothing",
              image:
                "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60",
              description: "Trendy fashion and accessories",
            },
            {
              name: "Accessories",
              image:
                "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop&q=60",
              description: "Complete your style",
            },
          ].map((category) => (
            <Link
              key={category.name}
              to={`/categories/${category.name.toLowerCase()}`}
              className="group relative h-64 overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-200">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                review:
                  "Amazing quality products and fast shipping. Will definitely shop here again!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                review:
                  "Great customer service and competitive prices. Highly recommended!",
                rating: 5,
              },
              {
                name: "Emily Davis",
                review:
                  "The best online shopping experience I've had. Love their selection!",
                rating: 5,
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.review}</p>
                <p className="font-semibold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}