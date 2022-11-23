import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { Container, Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";

function Home() {
  return (
    <Box marginTop={10}>
      <Container spacing={2} maxWidth="sm">
        <Typography variant="h3">This is home page</Typography>
      </Container>
    </Box>
  );
}

export default Home;
