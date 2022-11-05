import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/system";
import { Alert, Button, TextField } from "@mui/material";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";

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
    <Container spacing={2} maxWidth="sm">
      <h3>Create new topic</h3>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Name" name="name" onChange={onChange} />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        Create
      </Button>
    </Container>
  );
}

export default NewTopic;
