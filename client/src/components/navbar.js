import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };
  console.log(user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Carguys
            </Link>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <>
                <Link
                  to={"/user/" + user._id}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "0.5rem",
                  }}
                >
                  Profile
                </Link>

                <Link
                  to={"/user/" + user._id + "/notifications"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Notifications
                </Link>

                <Button
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "0.5rem",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
