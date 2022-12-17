import { useQuery } from "@apollo/client";
import { Avatar, CardHeader } from "@mui/material";
import gql from "graphql-tag";

const GET_USER = gql`
  query Query($id: ID!) {
    getUser(ID: $id) {
      nickname
      profilePicture
    }
  }
`;

function ProfilePicture({ userId, date }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  console.log(data);

  return (
    <CardHeader
      avatar={<Avatar src={data.getUser.profilePicture} />}
      title={data.getUser.nickname}
      subheader={date}
    />
  );
}

export default ProfilePicture;
