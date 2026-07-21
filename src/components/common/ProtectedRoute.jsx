import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

// allowedRoles: array of roles permitted, e.g. ["customer", "manager", "admin"]
// Admin always passes regardless of what's listed — full access by design.
export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const hasAccess = user.role === "admin" || !allowedRoles || allowedRoles.includes(user.role);

    if (!hasAccess) {
        return <Navigate to="/" replace />;
    }

    return children;
};