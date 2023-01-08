import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { Container, Stack } from "@mui/system";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteIcon from "../components/Topic/FavouriteIcon";
import ProfilePicture from "../components/Topic/ProfilePicture";

const GET_TOPICS = gql`
  query GetTopics {
    getTopics {
      _id
      name
      posts
      premium
      ownerId
      likes
      banner
      date
    }
  }
`;

const ADD_FAVOURITES = gql`
  mutation Mutation($favouritesInput: FavouritesInput) {
    addFavourites(favouritesInput: $favouritesInput) {
      _id
      topicId
      userId
    }
  }
`;

const DELETE_TOPIC = gql`
  mutation Mutation($id: ID!) {
    deleteTopic(ID: $id) {
      name
    }
  }
`;

const TOPIC_SUBSCRIPTION = gql`
  subscription TopicCreated {
    topicCreated {
      _id
      name
      posts
      premium
      ownerId
      likes
      banner
      date
    }
  }
`;

const DELETE_TOPIC_SUB = gql`
  subscription Subscription {
    topicDeleted {
      name
    }
  }
`;

const TOPIC_LIKED = gql`
  subscription TopicLiked {
    topicLiked {
      name
      likes
    }
  }
`;

function TopicsList() {
  const { user } = useContext(AuthContext);
  const { loading, error, data, subscribeToMore } = useQuery(GET_TOPICS);

  subscribeToMore({
    document: TOPIC_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newTopic = subscriptionData.data.topicCreated;
      return Object.assign({}, prev, {
        getTopics: {
          topics: [newTopic, ...prev.getTopics],
        },
      });
    },
  });

  subscribeToMore({
    document: DELETE_TOPIC_SUB,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const deletedTopic = subscriptionData.data.topicDeleted;
      return Object.assign({}, prev, {
        getTopics: {
          topics: [deletedTopic, ...prev.getTopics],
        },
      });
    },
  });

  subscribeToMore({
    document: TOPIC_LIKED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const topicLiked = subscriptionData.data.topicLiked;
      return Object.assign({}, prev, {
        getTopics: {
          topics: [topicLiked, ...prev.getTopics],
        },
      });
    },
  });

  const [addFavourites, favorites] = useMutation(ADD_FAVOURITES);

  const [deleteTopic, deleteTarget] = useMutation(DELETE_TOPIC);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <Box marginTop={10} bgcolor={"background.default"} color={"text.primary"}>
      {data.getTopics.map((topic) => (
        <Card sx={{ margin: 5 }}>
          {/* <CardHeader
            avatar={<Avatar />}
            title="Owner"
            subheader="September 14, 2016"
          /> */}
          <ProfilePicture userId={topic.ownerId} date={topic.date} />
          <Link
            to={topic._id}
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <CardMedia
              component="img"
              height="130"
              image={topic.banner}
              alt="Topic banner"
            />
            <CardContent>
              <Typography variant="h5" color="text">
                {topic.name}
              </Typography>
            </CardContent>
          </Link>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavouriteIcon
                topicId={topic._id}
                addFavourites={addFavourites}
              />

              <Typography color="white">{topic.likes}</Typography>
            </IconButton>
          </CardActions>
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
                deleteTopic({
                  variables: {
                    id: topic._id,
                  },
                });
              }}
            >
              Delete topic
            </Button>
          )}
        </Card>
      ))}
    </Box>
  );
}

export default TopicsList;
