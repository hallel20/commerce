import { useStore } from "../lib/store";

export const handleLogout = () => {
  useStore.getState().setUser(null);
  localStorage.removeItem("accessToken");
};

export const isLoggedIn = () => {
  if (localStorage.getItem("accessToken")) return true;
  return false;
};
