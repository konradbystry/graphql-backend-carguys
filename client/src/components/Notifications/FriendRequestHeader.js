import { useQuery } from "@apollo/client";
import { Avatar, CardHeader } from "@mui/material";
import gql from "graphql-tag";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(ID: $id) {
      nickname
      profilePicture
    }
  }
`;

function FriendRequestHeader({ userId }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <CardHeader
      avatar={<Avatar src={data.getUser.profilePicture} />}
      title={data.getUser.nickname}
      subheader="Want to be your friend"
    />
  );
}

export default FriendRequestHeader;
