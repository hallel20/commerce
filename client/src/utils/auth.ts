import { useStore } from "../lib/store";

export const handleLogout = () => {
    useStore.getState().setUser(null);
    localStorage.removeItem("accessToken");
}