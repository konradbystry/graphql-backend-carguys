import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { Container, Stack } from "@mui/system";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { gql } from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

const GET_FEED = gql`
  query Query {
    getFeed {
      date
      image
      text
      _id
      title
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(GET_FEED);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <Box marginTop={10}>
      {data.getFeed.map((feed) => (
        <Card sx={{ marginTop: 6 }}>
          <CardMedia component="img" height="%100" image={feed.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {feed.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feed.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Home;
