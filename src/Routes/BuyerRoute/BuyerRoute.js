import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useBuyer from "../../hooks/useBuyer";
import { AuthContext } from "../../Pages/Contexts/AuthProvider";


const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if (loading || isBuyerLoading) {
        return <progress className="progress w-full"></progress>
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;