import { useQuery } from "@apollo/client";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import { Link, useParams } from "react-router-dom";
import ProfilePicture from "../Topic/ProfilePicture";
import { Box } from "@mui/system";

const GET_TOPIC = gql`
  query GetTopic($id: ID!) {
    getTopic(ID: $id) {
      firstPost
      ownerId
    }
  }
`;

function FirstPost() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_TOPIC, {
    variables: { id: id },
  });

  console.log(id);
  console.log(data);

  if (loading) return <p>loading...</p>;
  if (loading) return <p>error</p>;

  return (
    <Box>
      <Card sx={{ margin: 5 }}>
        <ProfilePicture
          userId={data.getTopic.ownerId}
          date={data.getTopic.ownerId}
        />
        {/* <CardMedia
        component="img"
        height="%100"
        image="https://www.wyborkierowcow.pl/wp-content/uploads/2022/10/bmw-m2-coupe-cennik-sylwetka1.jpg"
        alt="Paella dish"
      /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.getTopic.firstPost}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );

  // return (
  //   <Card sx={{ margin: 5 }}>
  //     {data.getChat.userId === id && (
  //       <ProfilePicture
  //         userId={data.getChat.secondUserId}
  //         date={data.getChat.date}
  //       />
  //     )}

  //     {data.getChat.secondUserId === id && (
  //       <ProfilePicture userId={data.getChat.userId} date={data.getChat.date} />
  //     )}

  //     {/* <CardMedia
  //     component="img"
  //     height="%100"
  //     image="https://www.wyborkierowcow.pl/wp-content/uploads/2022/10/bmw-m2-coupe-cennik-sylwetka1.jpg"
  //     alt="Paella dish"
  //   /> */}
  //     <CardContent>
  //       <Typography variant="body2" color="text.secondary">
  //         {data.getChat.initMessage}
  //       </Typography>
  //     </CardContent>
  //   </Card>
  // );
}
export default FirstPost;
