import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/Navbar";
import Topic from "./pages/Topic";
import TopicsList from "./pages/TopicsList";
import User from "./pages/User";
import NewTopic from "./pages/NewTopic";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Notifications from "./pages/Notifications";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#5893df",
    },
    secondary: {
      main: "#2ec5d3",
    },
    background: {
      default: "#192231",
      paper: "#24344d",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
});

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />

        <Stack direction={"row"} spacing={2} justifyContent="space-between">
          {user ? (
            <>
              <Sidebar />
            </>
          ) : (
            <></>
          )}

          {/* <Feed /> */}
          <Box
            flex={4}
            p={2}
            bgcolor={"background.default"}
            color={"text.primary"}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/topics">
                <Route index element={<TopicsList />} />
                <Route path=":id" element={<Topic />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="new" element={<NewTopic />} />
                </Route>
              </Route>
              <Route path="/user/:id" element={<User />} />
              <Route
                path="/user/:id/notifications"
                element={<Notifications />}
              />
            </Routes>
          </Box>
          {user ? (
            <>
              <Rightbar />
            </>
          ) : (
            <></>
          )}
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
