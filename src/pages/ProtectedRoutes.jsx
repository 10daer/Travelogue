import Cookies from "js-cookie";
import { UserContext } from "../Customs/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { userIsAuthentic, readCookie } = UserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get("userSession");
    if (userId) {
      // readCookie(userId);
    } else {
      navigate("/login");
    }
  }, [readCookie, navigate]);

  return userIsAuthentic ? children : navigate("/login");
}

export default ProtectedRoutes;
