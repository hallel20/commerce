import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaUserCog,
  FaList,
  FaBars,
  FaTimes,
  FaEye,
} from "react-icons/fa";

const Sidebar = ({ isAdmin }: { isAdmin: boolean }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      icon: <FaHome />,
      label: "Home",
      to: isAdmin ? "/admin" : "/staff",
    },
    {
      icon: <FaBox />,
      label: "Products",
      to: isAdmin ? "/admin/products" : "/staff/products",
    },
    {
      icon: <FaShoppingCart />,
      label: "Orders",
      to: isAdmin ? "/admin/orders" : "/staff/orders",
    },
    {
      icon: <FaUsers />,
      label: "Users",
      to: isAdmin ? "/admin/users" : "/staff/users",
    },
    {
      icon: <FaList />,
      label: "Categories",
      to: isAdmin ? "/admin/categories" : "/staff/categories",
    },
  ];

  {
    isAdmin &&
      sidebarItems.push({
        icon: <FaUserCog />,
        label: "Staff",
        to: "/admin/staff",
      });
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg lg:hidden"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white h-screen p-6 flex flex-col transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        {/* Logo or Dashboard Title */}
        <h2 className="text-2xl font-bold mb-8 text-blue-400 flex items-center">
          <span className="mr-2">🚀</span> Dashboard
        </h2>

        {/* Navigation Links */}

        <ul className="space-y-2 flex-1">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <hr className="py-4" />
            <li>
              <Link
                to="/"
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="mr-3"><FaEye /></span>
                <span>View as User</span>
              </Link>
            </li>

        </ul>

        {/* Footer or Logout Section */}
        <div className="mt-auto border-t border-gray-700 pt-4">
          <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <span className="mr-3">👋</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
