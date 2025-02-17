import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  Package,
  Menu,
  X,
  LogOut,
  ShoppingCart,
  LogIn,
} from "lucide-react";
import { useStore } from "../lib/store";
import { FaChevronDown } from "react-icons/fa6";
import SearchBar from "./searchBar";
import { FaSearch } from "react-icons/fa";
import Footer from "./Footer";
import { handleLogout } from "../utils/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { user, cart } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigation = [
    { name: "Orders", href: "/orders", icon: Package },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Account", href: "/account", icon: User },
    { name: "Dashboard", href: "/admin", icon: User },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm fixed w-full z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <ShoppingBag className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-2xl font-bold text-gray-900">
                    Commerce
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex">
                <SearchBar />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-4">
                <div className="relative" ref={dropdownRef}>
                  {/* Account Button */}
                  {/* {user ? ( */}
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                  >
                    <span>
                      {user ? `Hi, ${user.account?.firstName}` : "My Account"}
                    </span>
                    {/* @ts-ignore */}
                    <FaChevronDown className="h-4 w-4 ml-1" />
                  </button>
                  {/* ) : ( */}
                  {/* <Link
                    to="/login"
                    className="flex items-center p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                  >
                    Login
                  </Link> */}
                  {/* )} */}

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-1 flex flex-col items-center">
                        {navigation.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={toggleDropdown}
                              className={`flex items-center px-4 py-2 text-sm ${
                                location.pathname === item.href
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                              }`}
                            >
                              <Icon className="h-5 w-5 mr-2" />
                              {item.name}
                              {item.name === "Cart" && cart.length > 0 && (
                                <span className="ml-auto bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                  {cart.length}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                        {user ? (
                          <button
                            onClick={handleLogout}
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <LogOut className="h-5 w-5 mr-1.5" />
                            Logout
                          </button>
                        ) : (
                          <Link
                            to="/login"
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <LogIn className="h-5 w-5 mr-1.5" />
                            Login
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to="/cart"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                >
                  <ShoppingCart
                    className="h-5 w-5 mr-1.5"
                    onClick={toggleCart}
                  />
                  {cart.length > 0 && (
                    <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </nav>

              {/* Mobile menu buttons */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMobileSearchOpen((prev) => !prev)}
                  className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  <FaSearch />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div
              className={`px-2 pt-2 flex flex-col items-center space-y-1 sm:px-3 transition-all ease-in-out duration-700 overflow-hidden ${
                isMobileMenuOpen ? "h-auto opacity-100 pb-3" : "h-0 opacity-0"
              }`}
            >
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-1.5" />
                    {item.name}
                    {item.name === "Cart" && cart.length > 0 && (
                      <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                );
              })}
              <Link
                to="/cart"
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  `}
              >
                <ShoppingCart className="h-5 w-5 mr-1.5" onClick={toggleCart} />{" "}
                Cart
                {cart.length > 0 && (
                  <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              {user && (
                <button
                  onClick={() => {
                    useStore.getState().setUser(null);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  <LogOut className="h-5 w-5 mr-1.5" />
                  Logout
                </button>
              )}
            </div>
            <div
              className={`px-2 pt-2 flex flex-col items-center space-y-1 sm:px-3 transition-all ease-in-out duration-700 overflow-hidden ${
                isMobileSearchOpen ? "h-auto opacity-100 pb-3" : "h-0 opacity-0"
              }`}
            >
              <SearchBar />
            </div>
          </div>
        </header>
        <div className="h-16"></div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
