import { Button, Typography } from "@mui/material";

import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";

function StartPage(props) {
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
              Carguys
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              marginTop={5}
              color="yellow"
            >
              Join Carguys community now!
            </Typography>
            <Typography
              component="h2"
              variant="h5"
              marginTop={5}
              marginBottom={5}
            >
              {" "}
              We have a great community of fans of burning rubber and loud
              exhausts. Are you looking for help with your car? Are you looking
              how to upgrade your beast? Join now!
            </Typography>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
              }}
            >
              <Button variant="contained">JOIN NOW!</Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StartPage;
