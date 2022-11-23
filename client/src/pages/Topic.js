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
    <Box flex={4} p={2} marginTop={10}>
      <Typography variant="h4" marginBottom={8}>
        This is topic {id} page
      </Typography>

      {data.getPosts.map((post) => (
        <Card sx={{ margin: 5 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "grey" }} aria-label="recipe">
                U
              </Avatar>
            }
            title={
              <Link
                to={"/user/" + post.userId}
                style={{
                  textDecoration: "none",
                  color: "grey",
                }}
              >
                {post.userName}
              </Link>
            }
            subheader={post.date}
          />
          {/* <CardMedia
            component="img"
            height="%100"
            image="https://www.wyborkierowcow.pl/wp-content/uploads/2022/10/bmw-m2-coupe-cennik-sylwetka1.jpg"
            alt="Paella dish"
          /> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Checkbox
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
              />
            </IconButton>
            {/* <IconButton aria-label="share">
                 <ShareIcon />
               </IconButton> */}
          </CardActions>
        </Card>
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
        <Button variant="contained" onClick={onSubmit}>
          Post
        </Button>
      </Container>
    </Box>
    // <Container spacing={2} maxWidth="md">
    //   <h1>This is topic {id} page</h1>
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   {data.getPosts.map((post) => (
    //     <div>
    //       <Avatar alt="User" src={defaultProfilePicture} />
    //       <Link to={"/user/" + post.userId}>
    //         <h1>{post.userName} :</h1>
    //       </Link>
    //       <h1>{post.date}</h1>
    //       <h1>{post.text}</h1>
    //     </div>
    //   ))}
    //   <br></br>
    //   <br></br>
    //   <br></br>
    //   <h3>Create new post</h3>
    //   <Stack spacing={2} paddingBottom={2}>
    //     <TextField label="Text" name="text" onChange={onChange} />
    //   </Stack>
    //   {errors.map(function (error) {
    //     return <Alert severity="error">{error.message}</Alert>;
    //   })}
    //   <Button variant="contained" onClick={onSubmit}>
    //     Post
    //   </Button>
    // </Container>
  );
}

export default Topic;
