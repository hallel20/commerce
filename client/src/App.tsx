// src/App.js
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/loading";
import ClientComponent from "./components/Client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

// Lazy load all components
const ForbiddenPage = lazy(() => import("./pages/403"));
const StaffDashboard = lazy(() => import("./components/StaffDashboard"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route
              path="/403"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ForbiddenPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
