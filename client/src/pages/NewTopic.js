import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/system";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "../utility/hooks";
import { useMutation, useQuery } from "@apollo/react-hooks";
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
      banner
    }
  }
`;

const GET_BANNERS = gql`
  query Query {
    getBanners {
      _id
      image
    }
  }
`;

function NewTopic() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_BANNERS);

  const [errors, setErrors] = useState([]);

  function setBanner() {
    return "t";
  }

  function createTopicCallback() {
    createTopic();
  }

  const { onChange, onSubmit, values } = useForm(createTopicCallback, {
    name: "",
    firstPost: "",
    ownerId: user._id,
    banner: "",
  });

  const [createTopic, newTopic] = useMutation(CREATE_TOPIC, {
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

  function selectBanner(image) {
    values.banner = image;
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  console.log(values);

  return (
    <Box marginTop={10}>
      <Container spacing={2} maxWidth="sm">
        <Typography variant="h5">Name</Typography>
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

        <Typography variant="h5" mt={2}>
          First post
        </Typography>
        <Stack spacing={2} paddingBottom={2} marginTop={2}>
          <CssTextField
            label="Post"
            name="firstPost"
            multiline
            rows={3}
            onChange={onChange}
            id="custom-css-outlined-input"
          />
        </Stack>

        <Typography variant="h5" mt={2}>
          Select banner
        </Typography>

        {data.getBanners.map((banner) => (
          <Card
            sx={{ margin: 5 }}
            variant={banner.image === values.banner ? "outlined" : ""}
            onClick={(e) => {
              e.preventDefault();
              selectBanner(banner.image);
            }}
          >
            <CardMedia component="img" height="100" image={banner.image} />
          </Card>
        ))}

        <Button variant="contained" onClick={onSubmit}>
          Create
        </Button>
      </Container>
    </Box>
  );
}

export default NewTopic;
