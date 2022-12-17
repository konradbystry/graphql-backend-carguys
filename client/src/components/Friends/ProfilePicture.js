import { useQuery } from "@apollo/client";
import { Avatar } from "@mui/material";
import gql from "graphql-tag";

const GET_USER = gql`
  query Query($id: ID!) {
    getUser(ID: $id) {
      profilePicture
    }
  }
`;

function ProfilePicture({ friendId }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      id: friendId,
    },
  });

  if (loading) return <p>loading...</p>;
  if (loading) return <p>error</p>;

  return <Avatar src={data.getUser.profilePicture} />;
}

export default ProfilePicture;
