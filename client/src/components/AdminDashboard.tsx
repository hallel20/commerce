import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/admin/home";
import ProductsPage from "../pages/admin/products";
import OrdersPage from "../pages/admin/orders";
import UsersPage from "../pages/admin/users";
import StaffPage from "../pages/admin/staff";
import CategoriesPage from "../pages/admin/categories";
import AdminLayout from "./admin/layout";
import AdminRoute from "./adminRoute";
import AdminCreateProduct from "../pages/admin/products/create";

const AdminDashboard = () => {
  return (
    <AdminLayout isAdmin>
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route
            path="/products/create"
            element={<AdminCreateProduct />}
          />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
