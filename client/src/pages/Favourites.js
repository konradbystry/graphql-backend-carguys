import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
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
import ProfilePicture from "../components/Topic/ProfilePicture";

const GET_USERS_FAVOURITES = gql`
  query Query($userId: ID) {
    getUsersFavourites(userId: $userId) {
      _id
      name
      likes
      banner
      ownerId
      date
    }
  }
`;

const FAVOURITES_SUBSCRIPTION = gql`
  subscription AddedToFavourites {
    addedToFavourites {
      favourites
    }
  }
`;

function Favourites() {
  const { id } = useParams();

  const { loading, error, data, subscribeToMore } = useQuery(
    GET_USERS_FAVOURITES,
    {
      variables: {
        userId: id,
      },
    }
  );

  subscribeToMore({
    document: FAVOURITES_SUBSCRIPTION,
    variables: { userId: id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newFavourite = subscriptionData.data.addedToFavourites;
      return Object.assign({}, prev, {
        getUsersFavourites: {
          favourites: [newFavourite, ...prev.getUsersFavourites],
        },
      });
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <Box marginTop={10} bgcolor={"background.default"} color={"text.primary"}>
      {data.getUsersFavourites.map((topic) => (
        <Card sx={{ margin: 5 }}>
          {/* <CardHeader
            avatar={<Avatar />}
            title="Owner"
            subheader="September 14, 2016"
          /> */}
          <ProfilePicture userId={topic.ownerId} date={topic.date} />
          <Link
            to={"/topics/" + topic._id}
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
              <Checkbox
                icon={<FavoriteIcon sx={{ color: "red" }} />}
                checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
              />
              <Typography color="white">{topic.likes}</Typography>
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default Favourites;
