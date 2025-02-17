import HomePage from "../pages/admin/home";
import ProductsPage from "../pages/admin/products";
import OrdersPage from "../pages/admin/orders";
import UsersPage from "../pages/admin/users";
import CategoriesPage from "../pages/admin/categories";
import AdminLayout from "./admin/layout";
import { Routes, Route } from "react-router-dom";

const StaffDashboard = () => {
  return (
    <AdminLayout isAdmin={false}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default StaffDashboard;
