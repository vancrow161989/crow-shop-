import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentToken } from "./../../store/authSlice";
import { useSelector } from "react-redux";
// import { getTokenLocalStorage } from "../../services/authService";

function RequiredAuth({ data, isLoading }) {
  const tokenAccess = useSelector(selectCurrentToken);

  if (isLoading) return null;
  return data || tokenAccess ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default RequiredAuth;
