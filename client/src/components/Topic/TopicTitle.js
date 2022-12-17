import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import gql from "graphql-tag";

const GET_TOPIC = gql`
  query GetTopic($id: ID!) {
    getTopic(ID: $id) {
      name
    }
  }
`;

function TopicTitle({ id }) {
  const { data, loading, error } = useQuery(GET_TOPIC, {
    variables: { id: id },
  });

  if (loading) return <p>loading...</p>;
  if (loading) return <p>error</p>;

  return (
    <Typography variant="h4" marginBottom={8}>
      {data.getTopic.name}
    </Typography>
  );
}

export default TopicTitle;
