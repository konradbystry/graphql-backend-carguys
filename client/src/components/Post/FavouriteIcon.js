import { useMutation, useQuery } from "@apollo/client";
import { Checkbox, Typography } from "@mui/material";
import gql from "graphql-tag";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// const GET_USERS_FAVOURITES = gql`
//   query Query($userId: ID) {
//     getUsersFavourites(userId: $userId) {
//       _id
//       name
//     }
//   }
// `;

const GET_POST = gql`
  query Query($id: ID!) {
    getPost(ID: $id) {
      _id
      likes
      likedBy
    }
  }
`;

// const ADDED_FAVOURITES_SUB = gql`
//   subscription AddedFavourites {
//     addedFavourites {
//       topicId
//       userId
//     }
//   }
// `;

const LIKE_POST = gql`
  mutation Mutation($postId: ID!, $userId: ID!) {
    likePost(postId: $postId, userId: $userId) {
      _id
    }
  }
`;

function FavouriteIcon({ postId, postLikedBy }) {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id: postId },
    onError() {
      console.log("co się stało kurczę");
    },
  });

  console.log(postId + " ID");

  const [likePost, likeTarget] = useMutation(LIKE_POST);

  // subscribeToMore({
  //   document: ADDED_FAVOURITES_SUB,
  //   variables: { userId: user._id },
  //   updateQuery: (prev, { subscriptionData }) => {
  //     if (!subscriptionData.data) return prev;
  //     const newFavourite = subscriptionData.data.addedFavourites;
  //     return Object.assign({}, prev, {
  //       getUsersFavourites: {
  //         favourites: [newFavourite, ...prev.getUsersFavourites],
  //       },
  //     });
  //   },
  // });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  let likedPost = postLikedBy.find((userId) => {
    if (userId !== null) {
      return userId === user._id;
    }
  });

  if (likedPost === undefined) {
    console.log("not liked");
    return (
      <Checkbox
        onClick={(e) => {
          e.preventDefault();
          likePost({
            variables: {
              userId: user._id,
              postId: postId,
            },
          });
        }}
        icon={<FavoriteBorderIcon />}
        checkedIcon={<FavoriteIcon sx={{ color: "red" }} />}
      />
    );
  }

  if (likedPost !== undefined || likedPost === user._id) {
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
