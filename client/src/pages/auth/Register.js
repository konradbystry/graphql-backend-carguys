import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Typography } from "@mui/material";
import { CssTextField } from "../../mui/styled/CssTextField";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      nickname
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    registerUser();
  }

  // eslint-disable-next-line no-undef
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      console.log("tutaj");
      context.login(userData);
      navigate("/home");
      window.location.reload();
    },
    onError({ graphQLErrors }) {
      console.log(this.variables);
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit="" sx={{ mt: 1 }}>
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="nickname"
                label="Nickname"
                name="nickname"
                autoComplete="nickname"
                onChange={onChange}
                autoFocus
              />

              <CssTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                autoFocus
              />
              <CssTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
                autoComplete="current-password"
              />

              <CssTextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                onChange={onChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={onSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "yellow",
                    }}
                  >
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              {errors.map((error) => (
                <Alert sx={{ marginTop: 2 }} severity="error">
                  {error.message}
                </Alert>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
