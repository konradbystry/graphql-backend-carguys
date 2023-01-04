import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";
import BlockedPage from "../pages/BlockedPage";

function Blocked() {
  const { user } = useContext(AuthContext);
  return user.blocked === true ? <BlockedPage /> : <Outlet />;
}

export default Blocked;
