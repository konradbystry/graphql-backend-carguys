import { useQuery } from "@apollo/client";
import { Checkbox, Typography } from "@mui/material";
import gql from "graphql-tag";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
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

function FavouriteIcon({ topicId, addToFavourites }) {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_USERS_FAVOURITES, {
    variables: { userId: user._id },
  });

  if (loading) return <p>loading...</p>;
  if (loading) return <p>error</p>;

  let likedTopic = data.getUsersFavourites.find((topic) => {
    return topic._id === topicId;
  });

  if (likedTopic === undefined) {
    console.log("not liked");
    return (
      <Checkbox
        onClick={(e) => {
          e.preventDefault();
          addToFavourites({
            update() {
              // window.location.reload();
            },
            variables: {
              userId: user._id,
              topicId: topicId,
            },
          });
        }}
        icon={<FavoriteBorderIcon />}
        checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
      />
    );
  }

  if (likedTopic !== undefined || likedTopic === topicId) {
    console.log("liked");
    return (
      <Checkbox
        icon={<FavoriteIcon sx={{ color: "red" }} />}
        checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
      />
    );
  }
}

export default FavouriteIcon;
