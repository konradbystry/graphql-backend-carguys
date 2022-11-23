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

const GET_TOPICS = gql`
  query GetTopics {
    getTopics {
      _id
      name
      posts
      premium
      ownerId
    }
  }
`;

function TopicsList() {
  const { loading, error, data } = useQuery(GET_TOPICS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <Box marginTop={10} bgcolor={"background.default"} color={"text.primary"}>
      {data.getTopics.map((topic) => (
        <Card sx={{ margin: 5 }}>
          {/* <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        /> */}
          <Link
            to={topic._id}
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <CardMedia
              component="img"
              height="100"
              image="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/motorsport/customer-racing/custom_gt3.jpg"
              alt="Paella dish"
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
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
              />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default TopicsList;
