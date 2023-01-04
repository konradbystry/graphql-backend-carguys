import { useContext } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import { Container } from "@mui/system";
import { AuthContext } from "../context/authContext";

function BlockedPage() {
  // const { user } = useContext(AuthContext);
  // const { id } = useParams();

  // const { data, loading, error } = useQuery(GET_USER, {
  //   variables: { id: id },
  // });

  // if (loading) {
  //   return <p>loading...</p>;
  // }
  // if (error) {
  //   return <p>error</p>;
  // }

  console.log("BLOCKED BLOCKED");

  return (
    <Box>
      <Grid container component="main" sx={{ height: "96vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://img3.wallspic.com/originals/5/1/9/4/6/164915-nissan_gt_r-nissan-cars-sports_car-nissan_skyline-1920x1080.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ background: "#121212" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h2" marginTop={15}>
              Woops..
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              marginTop={5}
              color="yellow"
            >
              Account suspended
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              marginTop={5}
              marginBottom={5}
            >
              {" "}
              Your account has been blocked by administration.
            </Typography>
            <Link
              to="/blocked"
              style={{
                textDecoration: "none",
              }}
            >
              <Button variant="contained">LOGOUT</Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BlockedPage;
