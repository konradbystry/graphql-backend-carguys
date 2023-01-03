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
  Box,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Checkbox,
} from "@mui/material";
import { useForm } from "../utility/hooks";
import { useContext, useState } from "react";
import defaultProfilePicture from "../assets/defaultProfilePicture.png";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { CssTextField } from "./../mui/styled/CssTextField";
import { BootstrapPostField } from "../mui/styled/BootstrapPostField";
import Post from "../components/Post";
import TopicTitle from "../components/Topic/TopicTitle";
import FirstPost from "../components/Topic/FirstPost";
import { convertLength } from "@mui/material/styles/cssUtils";

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
      image
    }
  }
`;

const POST_SUBSCRIPTION = gql`
  subscription Subscription {
    postCreated {
      date
      image
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

  //image
  const [image, setImage] = useState("");
  function readImage(e) {
    const reader = new FileReader();
    let blob = e.target.files[0];
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      let base64data = reader.result;
      setImage(base64data);
    };
  }

  const { loading, error, data, subscribeToMore } = useQuery(GET_POSTS, {
    variables: { topicId: id },
  });

  subscribeToMore({
    document: POST_SUBSCRIPTION,
    variables: { topicId: id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newPost = subscriptionData.data.postCreated;
      return Object.assign({}, prev, {
        getPosts: {
          posts: [newPost, ...prev.getPosts],
        },
      });
    },
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
    image: "",
  });

  const [createPost, newPost] = useMutation(CREATE_POST, {
    update(proxy, { data: { createPost: postData } }) {
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

  console.log(typeof image);
  values.image = image;
  console.log(values);

  return (
    <Box flex={4} p={2} marginTop={10}>
      <TopicTitle id={id} />
      <FirstPost />
      {data.getPosts.map((post) => (
        <Post
          postDate={post.date}
          postUserId={post.userId}
          postText={post.text}
          postImage={post.image}
        />
      ))}

      <Container spacing={2} maxWidth="md">
        <Stack spacing={2} paddingBottom={2}>
          <CssTextField
            label="Write something..."
            name="text"
            multiline
            rows={3}
            onChange={onChange}
          />
        </Stack>
        {errors.map(function (error) {
          return <Alert severity="error">{error.message}</Alert>;
        })}
        <Button variant="contained" component="label">
          Upload File
          <input type="file" name="image" onChange={readImage} hidden />
        </Button>
        <br></br>
        <br></br>
        <Button variant="contained" onClick={onSubmit}>
          Post
        </Button>
      </Container>
    </Box>
  );
}

export default Topic;
