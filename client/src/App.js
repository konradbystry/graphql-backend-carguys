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
import { Box, Stack } from "@mui/material";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Box>
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
        <Box flex={4} p={2}>
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
            <Route path="/user/:id/notifications" element={<Notifications />} />
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
  );
}

export default App;
