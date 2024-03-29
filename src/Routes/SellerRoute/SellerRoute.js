import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../../hooks/useSeller";
import { AuthContext } from "../../Pages/Contexts/AuthProvider";


const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <progress className="progress w-full"></progress>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;