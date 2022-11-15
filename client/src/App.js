import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/navbar";
import Topic from "./pages/Topic";
import TopicsList from "./pages/TopicsList";
import User from "./pages/User";
import NewTopic from "./pages/NewTopic";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <div>
      <Navbar />
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
    </div>
  );
}

export default App;
