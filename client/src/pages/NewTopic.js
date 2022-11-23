import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/system";
import {
  Alert,
  Box,
  Button,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { CssTextField } from "./../mui/styled/CssTextField";

const CREATE_TOPIC = gql`
  mutation Mutation($topicInput: TopicInput) {
    createTopic(topicInput: $topicInput) {
      _id
      name
      posts
      premium
      ownerId
    }
  }
`;

// const CssTextField = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "#5893df",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "#5893df",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#5893df",
//     },
//     "&:hover fieldset": {
//       borderColor: "#5893df",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#5893df",
//     },
//   },
// });

function NewTopic() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function createTopicCallback() {
    createTopic();
  }

  const { onChange, onSubmit, values } = useForm(createTopicCallback, {
    name: "",
    ownerId: user._id,
  });

  const [createTopic, { loading }] = useMutation(CREATE_TOPIC, {
    update(proxy, { data: { createTopic: topicData } }) {
      navigate("/topics");
      window.location.reload();
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
      console.log(localStorage.getItem("token"));
    },
    variables: { topicInput: values },
  });

  return (
    <Box marginTop={10}>
      <Container spacing={2} maxWidth="sm">
        <Typography variant="h5">Create new topic</Typography>
        <Stack spacing={2} paddingBottom={2} marginTop={2}>
          <CssTextField
            label="Name"
            name="name"
            onChange={onChange}
            id="custom-css-outlined-input"
          />
        </Stack>
        {errors.map(function (error) {
          return <Alert severity="error">{error.message}</Alert>;
        })}
        <Button variant="contained" onClick={onSubmit}>
          Create
        </Button>
      </Container>
    </Box>
  );
}

export default NewTopic;
