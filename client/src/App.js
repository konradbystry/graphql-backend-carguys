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
import ChatList from "./pages/ChatList";
import Chat from "./pages/Chat";
import EditProfile from "./pages/EditProfile";
import Favourites from "./pages/Favourites";
import LoggedNavbar from "./components/LoggedNavbar";
import StartPage from "./pages/StartPage";
import Friends from "./pages/Friends";
import TopicSearch from "./pages/TopicSearch";
import Blocked from "./components/Blocked";
import BlockedPage from "./pages/BlockedPage";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      // main: "#5893df",
      main: "#e3da19",
    },
    secondary: {
      // main: "#2ec5d3",
      main: "#272727",
    },
    background: {
      default: "#121212",
      // default: "#192231",
      paper: "#272727",
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
        {user ? <LoggedNavbar /> : <Navbar />}

        <Stack direction={"row"} spacing={2} justifyContent="space-between">
          {user && user.blocked === false ? (
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
              <Route path="/" element={<StartPage />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoutes />}>
                <Route element={<Blocked />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/blocked" element={<BlockedPage />} />
                  <Route path="/topics">
                    <Route index element={<TopicsList />} />
                    <Route path=":id" element={<Topic />} />
                    {/* <Route element={<ProtectedRoutes />}> */}
                    <Route path="new" element={<NewTopic />} />
                    {/* </Route> */}
                    <Route path="search/:topicName" element={<TopicSearch />} />
                  </Route>
                  <Route path="/user/:id" element={<User />} />
                  <Route
                    path="/user/:id/notifications"
                    element={<Notifications />}
                  />
                  <Route path="user/:id/friends" element={<Friends />} />
                  <Route path="user/:id/chats" element={<ChatList />} />
                  <Route path="user/:id/chats/:chatId" element={<Chat />} />
                  <Route path="user/:id/edit" element={<EditProfile />} />
                  <Route path="user/:id/favourites" element={<Favourites />} />
                </Route>
              </Route>
            </Routes>
          </Box>
          {user && user.blocked === false ? (
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
