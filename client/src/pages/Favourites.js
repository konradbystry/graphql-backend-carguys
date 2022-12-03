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

const GET_USERS_FAVOURITES = gql`
  query Query($userId: ID) {
    getUsersFavourites(userId: $userId) {
      _id
      name
    }
  }
`;

function Favourites() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_USERS_FAVOURITES, {
    variables: {
      userId: id,
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <Box marginTop={10} bgcolor={"background.default"} color={"text.primary"}>
      {data.getUsersFavourites.map((topic) => (
        <Card sx={{ margin: 5 }}>
          <CardHeader
            avatar={<Avatar />}
            title="Owner"
            subheader="September 14, 2016"
          />
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
                icon={<FavoriteIcon sx={{ color: "red" }} />}
                checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
              />
              <Typography color="white">123</Typography>
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default Favourites;
