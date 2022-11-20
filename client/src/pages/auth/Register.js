import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/system";
import { Alert, Button, TextField, Typography } from "@mui/material";

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
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <Typography variant="h5" marginTop={10} marginBottom={3}>
        Register
      </Typography>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Nickname" name="nickname" onChange={onChange} />
        <TextField label="Email" name="email" onChange={onChange} />
        <TextField label="Password" name="password" onChange={onChange} />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          onChange={onChange}
        />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        Register
      </Button>
    </Container>
  );
}

export default Register;
