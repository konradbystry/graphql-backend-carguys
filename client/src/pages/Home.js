import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";

function Home() {
  return (
    <div>
      <h1>This is home page</h1>
      <Link to="/topics">
        <h1>Browse topics</h1>
      </Link>
    </div>
  );
}

export default Home;
