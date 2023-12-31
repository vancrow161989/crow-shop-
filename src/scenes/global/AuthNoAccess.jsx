import { Navigate, Outlet } from "react-router-dom";
import { getTokenLocalStorage } from "../../services/authService";
function AuthNoAccess({ data, isLoading }) {
  const tokenAccess = getTokenLocalStorage();

  if (isLoading) return null;
  return tokenAccess ? <Navigate to="/" replace /> : <Outlet />;
}

export default AuthNoAccess;
