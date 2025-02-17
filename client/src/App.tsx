// src/App.js
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/loading";
import ClientComponent from "./components/Client";
import { Toaster } from "react-hot-toast";

// Lazy load all components
const StaffDashboard = lazy(() => import("./components/StaffDashboard"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

function App() {
  return (
    <BrowserRouter>
    <Toaster />
        <Routes>
          <Route>
            <Route
              path="/*"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Layout>
                    <ClientComponent />
                  </Layout>
                </Suspense>
              }
            />
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route
              path="/staff/*"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <StaffDashboard />
                </Suspense>
              }
            />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
