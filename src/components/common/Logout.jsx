import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";
import { removeTokenLocalStorage } from "../../services/authService";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    removeTokenLocalStorage();
    dispatch(logout());
    toast.success("Successfully Logged Out'", {
      position: "top-center",
      hideProgressBar: true
    });
    navigate("/login");
  }, [navigate, removeTokenLocalStorage]);

  return null;
}

export default Logout;
