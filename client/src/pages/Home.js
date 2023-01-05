import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Container, Stack } from "@mui/system";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { gql } from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CssTextField } from "../mui/styled/CssTextField";
import { useForm } from "../utility/hooks";

const GET_FEED = gql`
  query Query {
    getFeed {
      date
      image
      text
      _id
      title
    }
  }
`;

const CREATE_FEED = gql`
  mutation Mutation($feedInput: FeedInput) {
    createFeed(feedInput: $feedInput) {
      _id
      date
      image
      text
      title
    }
  }
`;

const DELETE_FEED = gql`
  mutation Mutation($id: ID!) {
    deleteFeed(ID: $id) {
      _id
    }
  }
`;

function Home() {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_FEED);

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

  function createdFeedCallback() {
    createFeed();
  }

  const { onChange, onSubmit, values } = useForm(createdFeedCallback, {
    text: "",
    image: "",
    title: "",
  });

  const [createFeed, createdFeed] = useMutation(CREATE_FEED, {
    variables: { feedInput: values },
    update() {
      window.location.reload();
    },
  });

  const [deleteFeed, deleteTarget] = useMutation(DELETE_FEED);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  values.image = image;

  return (
    <Box marginTop={10}>
      {user.admin === true && (
        <Box>
          <CssTextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            onChange={onChange}
            autoFocus
          />

          <CssTextField
            margin="normal"
            required
            fullWidth
            id="text"
            label="Text"
            name="text"
            autoComplete="text"
            onChange={onChange}
            autoFocus
          />

          <Button sx={{ marginTop: 2 }} variant="contained" component="label">
            Image
            <input type="file" name="banner" onChange={readImage} hidden />
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={onSubmit}
            sx={{ mt: 3, mb: 2, background: "red", color: "white" }}
          >
            Create
          </Button>
        </Box>
      )}

      {data.getFeed.map((feed) => (
        <Card sx={{ marginTop: 6 }}>
          <CardMedia component="img" height="%100" image={feed.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {feed.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feed.text}
            </Typography>
          </CardContent>
          {user.admin === true && (
            <Button
              variant="contained"
              sx={{
                margin: 2,
                color: "white",
                background: "red",
              }}
              onClick={(e) => {
                e.preventDefault();
                deleteFeed({
                  variables: { id: feed._id },
                  update() {
                    window.location.reload();
                  },
                });
              }}
            >
              Delete feed
            </Button>
          )}
        </Card>
      ))}
    </Box>
  );
}

export default Home;
