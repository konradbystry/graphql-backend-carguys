import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { Container, Stack } from "@mui/system";

function Home() {
  return (
    <Container spacing={2} maxWidth="sm">
      <div>
        <h1>This is home page</h1>
        <Link to="/topics">
          <h1>Browse topics</h1>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
