// src/components/ClientComponent.js
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./loading";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Categories = lazy(() => import("../pages/Categories"));
const Orders = lazy(() => import("../pages/Orders"));
const Cart = lazy(() => import("../pages/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Account = lazy(() => import("../pages/Account"));
const Invoice = lazy(() => import("../pages/Invoice"));
const Terms = lazy(() => import("../pages/Terms"));
const Privacy = lazy(() => import("../pages/Privacy"));
const Shipping = lazy(() => import("../pages/Shipping"));
const Returns = lazy(() => import("../pages/Returns"));
const Home = lazy(() => import("../pages/Home"));

function ClientComponent() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="categories" element={<Categories />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
        <Route element={<ProtectedRoute />}>
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId/invoice" element={<Invoice />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="returns" element={<Returns />} />
      </Routes>
    </Suspense>
  );
}

export default ClientComponent;
