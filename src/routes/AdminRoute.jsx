import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const GuestRoute = ({ redirectPath }) => {
    const { token } = useAuthStore();

    if (token) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default GuestRoute;