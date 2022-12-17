import { useQuery } from "@apollo/client";
import { Avatar, CardHeader, Typography } from "@mui/material";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const GET_CHAT = gql``;

function OpenChatHeader({ userId, date }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>loading...</p>;
  if (loading) return <p>error</p>;

  return (
    <CardHeader
      avatar={<Avatar src={data.getUser.profilePicture} />}
      subheader={date}
      title={
        <Link
          to={"/user/" + userId}
          style={{
            textDecoration: "none",
            color: "grey",
          }}
        >
          <Typography color="white">{data.getUser.nickname}</Typography>
        </Link>
      }
    />
  );
}
export default OpenChatHeader;
