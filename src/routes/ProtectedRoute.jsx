import { Navigate, Outlet } from "react-router";
import useAuthStore from "../stores/authStore";

const ProtectedRoute = () => {
    const { token } = useAuthStore();

    if (!token) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;