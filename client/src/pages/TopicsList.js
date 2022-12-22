import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { Container, Stack } from "@mui/system";
import {
  Avatar,
  Box,
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

const ADD_TO_FAVOURITES = gql`
  mutation Mutation($userId: ID!, $topicId: ID!) {
    addToFavourites(userId: $userId, topicId: $topicId) {
      _id
      email
      favourites
      nickname
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

const LIKES_SUBSCRIPTION = gql`
  subscription Subscription {
    userLikedTopic {
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

  const [addToFavourites, favorites] = useMutation(ADD_TO_FAVOURITES);

  function addToFavouritesCallback(topicId) {
    console.log("test");
    addToFavourites({
      variables: {
        userId: user._id,
        topicId: topicId,
      },
    });
  }

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
                addToFavourites={addToFavourites}
              />

              <Typography color="white">{topic.likes}</Typography>
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default TopicsList;
