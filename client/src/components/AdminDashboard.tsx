import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/admin/home";
import ProductsPage from "../pages/admin/products";
import OrdersPage from "../pages/admin/orders";
import UsersPage from "../pages/admin/users";
import StaffPage from "../pages/admin/staff";
import CategoriesPage from "../pages/admin/categories";
import AdminLayout from "./admin/layout";

const AdminDashboard = () => {
  return (
    <AdminLayout isAdmin>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="staff" element={<StaffPage />} />
      <Route path="categories" element={<CategoriesPage />} />
    </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
