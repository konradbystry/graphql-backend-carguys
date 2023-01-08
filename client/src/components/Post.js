import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
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
import { useMutation, useQuery } from "@apollo/client";
import User from "../pages/User";
import FavouriteIcon from "./Post/FavouriteIcon";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(ID: $id) {
      nickname
      profilePicture
    }
  }
`;

const DELETE_POST = gql`
  mutation Mutation($id: ID!) {
    deletePost(ID: $id) {
      _id
    }
  }
`;

function Post({
  postDate,
  postUserId,
  postText,
  postImage,
  postId,
  postLikes,
  postLikedBy,
}) {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id: postUserId,
    },
  });

  const [deletePost, deleteTarget] = useMutation(DELETE_POST);

  //think about
  if (loading) return <p></p>;
  if (error) return <p></p>;

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={<Avatar src={data.getUser.profilePicture} />}
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
      {postImage !== "" && (
        <CardMedia component="img" height="%100" image={postImage} />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postText}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavouriteIcon postId={postId} postLikedBy={postLikedBy} />
          {/* <Checkbox
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
          /> */}
          <Typography color="white">{postLikes}</Typography>
        </IconButton>
        {/* <IconButton aria-label="share">
               <ShareIcon />
             </IconButton> */}
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
            deletePost({
              variables: { id: postId },
              update() {
                window.location.reload();
              },
            });
          }}
        >
          Delete post
        </Button>
      )}
    </Card>
  );
}

export default Post;
