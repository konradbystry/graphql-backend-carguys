import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";

function ProtectedRoutes() {
  const { user, logout } = useContext(AuthContext);
  return user ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
