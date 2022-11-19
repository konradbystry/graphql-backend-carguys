import { AuthContext } from "../context/authContext";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { Container, Stack } from "@mui/system";
import {
  Alert,
  Button,
  TextField,
  Avatar,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useForm } from "../utility/hooks";
import { useContext, useState } from "react";
import defaultProfilePicture from "../assets/defaultProfilePicture.png";
import { styled } from "@mui/material/styles";

const GET_POSTS = gql`
  query Query($topicId: String) {
    getPosts(topicId: $topicId) {
      userId
      userName
      topicId
      date
      text
      image
    }
  }
`;

const CREATE_POST = gql`
  mutation Mutation($newPost: PostInput) {
    createPost(postInput: $newPost) {
      text
      topicId
      userId
      userName
    }
  }
`;

function Topic() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  console.log(user.name);

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { topicId: id },
  });

  const [errors, setErrors] = useState([]);

  function createPostCallback() {
    createPost();
  }

  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    text: "",
    topicId: id,
    userId: user._id,
    userName: user.name,
  });

  const [createPost, newPost] = useMutation(CREATE_POST, {
    update(proxy, { data: { createPost: postData } }) {
      window.location.reload();
      console.log(this.variables);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
      console.log(this.variables);
    },
    variables: { newPost: values },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <Container spacing={2} maxWidth="md">
      <h1>This is topic {id} page</h1>
      <br></br>
      <br></br>
      <br></br>
      {data.getPosts.map((post) => (
        <div>
          <Avatar alt="User" src={defaultProfilePicture} />
          <Link to={"/user/" + post.userId}>
            <h1>{post.userName} :</h1>
          </Link>
          <h1>{post.date}</h1>
          <h1>{post.text}</h1>
        </div>
      ))}
      <br></br>
      <br></br>
      <br></br>
      <h3>Create new post</h3>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Text" name="text" onChange={onChange} />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        Post
      </Button>
    </Container>
  );
}

export default Topic;
