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

const ADDED_FAVOURITES_SUB = gql`
  subscription AddedFavourites {
    addedFavourites {
      topicId
      userId
    }
  }
`;

function FavouriteIcon({ topicId, addFavourites }) {
  const { user } = useContext(AuthContext);

  const { data, loading, error, subscribeToMore } = useQuery(
    GET_USERS_FAVOURITES,
    {
      variables: { userId: user._id },
    }
  );

  subscribeToMore({
    document: ADDED_FAVOURITES_SUB,
    variables: { userId: user._id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newFavourite = subscriptionData.data.addedFavourites;
      return Object.assign({}, prev, {
        getUsersFavourites: {
          favourites: [newFavourite, ...prev.getUsersFavourites],
        },
      });
    },
  });

  if (loading) return <p>loading...</p>;
  if (loading) return <p>error</p>;

  let likedTopic = data.getUsersFavourites.find((topic) => {
    if (topic !== null) {
      return topic._id === topicId;
    }
  });

  if (likedTopic === undefined) {
    console.log("not liked");
    return (
      <Checkbox
        onClick={(e) => {
          e.preventDefault();
          addFavourites({
            update() {
              // window.location.reload();
            },
            variables: {
              favouritesInput: {
                userId: user._id,
                topicId: topicId,
              },
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
