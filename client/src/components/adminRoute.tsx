import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../lib/store";

const AdminRoute = () => {
  const { user } = useStore()

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin" && user.role !== "staff") return <Navigate to="/403" replace />

  return <Outlet />;
};

export default AdminRoute;
