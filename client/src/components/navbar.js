import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  styled,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import { grey } from "@mui/material/colors";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: { display: "flex" },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: { display: "none" },
}));

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const onLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };
  console.log(user);

  return (
    <div>
      <AppBar position="fixed">
        <StyledToolbar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Carguys
          </Typography>
          <SportsMotorsportsIcon
            sx={{ display: { xs: "block", sm: "none" } }}
          />

          {user ? (
            <>
              <Search>
                <InputBase placeholder="Search..." />
              </Search>
              <Box>
                {" "}
                <Icons>
                  <Badge badgeContent={4} color="error">
                    <MessageIcon />
                  </Badge>
                  <Link
                    to={"/user/" + user._id + "/notifications"}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <Badge badgeContent={4} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </Link>
                  <Avatar
                    sx={{ width: "30", height: "30" }}
                    onClick={(e) => setOpen(true)}
                  />
                </Icons>
                <UserBox onClick={(e) => setOpen(true)}>
                  <Avatar sx={{ width: "30", height: "30" }} />
                  <Typography>Username</Typography>
                </UserBox>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  open={open}
                  onClose={(e) => setOpen(false)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem>
                    <Link
                      to={"/user/" + user._id}
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>My account</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </Box>
            </>
          )}
          {/* <Icons>
            <Badge badgeContent={4} color="error">
              <MessageIcon />
            </Badge>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
            <Avatar
              sx={{ width: "30", height: "30" }}
              onClick={(e) => setOpen(true)}
            />
          </Icons>
          <UserBox onClick={(e) => setOpen(true)}>
            <Avatar sx={{ width: "30", height: "30" }} />
            <Typography>Username</Typography>
          </UserBox> */}
        </StyledToolbar>
      </AppBar>
    </div>
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Typography variant="h5" component="div">
    //         <Link to="/" style={{ textDecoration: "none", color: "white" }}>
    //           Carguys
    //         </Link>
    //       </Typography>
    //       <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
    //         {user ? (
    //           <>
    //             <Link
    //               to={"/user/" + user._id}
    //               style={{
    //                 textDecoration: "none",
    //                 color: "white",
    //                 marginRight: "0.5rem",
    //               }}
    //             >
    //               Profile
    //             </Link>

    //             <Link
    //               to={"/user/" + user._id + "/notifications"}
    //               style={{ textDecoration: "none", color: "white" }}
    //             >
    //               Notifications
    //             </Link>

    //             <Button
    //               style={{ textDecoration: "none", color: "white" }}
    //               onClick={onLogout}
    //             >
    //               Logout
    //             </Button>
    //           </>
    //         ) : (
    //           <>
    //             <Link
    //               to="/login"
    //               style={{
    //                 textDecoration: "none",
    //                 color: "white",
    //                 marginRight: "0.5rem",
    //               }}
    //             >
    //               Login
    //             </Link>
    //             <Link
    //               to="/register"
    //               style={{ textDecoration: "none", color: "white" }}
    //             >
    //               Register
    //             </Link>
    //           </>
    //         )}
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}

export default Navbar;
