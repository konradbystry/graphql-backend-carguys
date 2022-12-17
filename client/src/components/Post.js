import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import gql from "graphql-tag";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/client";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(ID: $id) {
      nickname
      profilePicture
    }
  }
`;

function Post({ postDate, postUserId, postText }) {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id: postUserId,
    },
  });

  //think about
  if (loading) return <p></p>;
  if (error) return <p></p>;

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={<Avatar src={data.getUser.profilePicture}>U</Avatar>}
        title={
          postUserId === user._id ? (
            <Link
              to={"/user/" + postUserId}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              {data.getUser.nickname + " (You)"}
            </Link>
          ) : (
            <Link
              to={"/user/" + postUserId}
              style={{
                textDecoration: "none",
                color: "grey",
              }}
            >
              {data.getUser.nickname}
            </Link>
          )
        }
        subheader={postDate}
      />
      {/* <CardMedia
          component="img"
          height="%100"
          image="https://www.wyborkierowcow.pl/wp-content/uploads/2022/10/bmw-m2-coupe-cennik-sylwetka1.jpg"
          alt="Paella dish"
        /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postText}
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
  );
}

export default Post;
