import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export function RequireOnboarded() {
    const { user } = useAuth();

    if (user && user.onboarded_at == null)
        return <Navigate to="/onboarding" replace />
        
    return <Outlet />
}