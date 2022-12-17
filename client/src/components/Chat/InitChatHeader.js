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

// const GET_USER = gql`
//   query GetUser($id: ID!) {
//     getUser(ID: $id) {
//       profilePicture
//       nickname
//     }
//   }
// `;

const GET_CHAT = gql`
  query GetChat($id: ID!) {
    getChat(ID: $id) {
      initMessage
      lastMessage
      secondUserId
      userId
      initDate
      initUserId
    }
  }
`;

function InitChatHeader({ userId, date }) {
  const { id, chatId } = useParams();
  const { data, loading, error } = useQuery(GET_CHAT, {
    variables: { id: chatId },
  });

  console.log(data);

  if (loading) return <p>loading...</p>;
  if (loading) return <p>error</p>;

  console.log(data.getChat.secondUserId + " drugi");
  console.log(data.getChat.userId + " pierwszy");

  if (data.getChat.userId === id)
    return (
      <Box>
        <Card
          style={{
            background: "none",
            boxShadow: "none",
          }}
        >
          <ProfilePicture
            userId={data.getChat.secondUserId}
            date={data.getChat.date}
          />
        </Card>
        <Card sx={{ margin: 5 }}>
          <ProfilePicture
            userId={data.getChat.initUserId}
            date={data.getChat.initDate}
          />
          {/* <CardMedia
        component="img"
        height="%100"
        image="https://www.wyborkierowcow.pl/wp-content/uploads/2022/10/bmw-m2-coupe-cennik-sylwetka1.jpg"
        alt="Paella dish"
      /> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data.getChat.initMessage}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );

  if (data.getChat.secondUserId === id)
    return (
      <Box>
        <Card
          style={{
            background: "none",
            boxShadow: "none",
          }}
        >
          <ProfilePicture
            userId={data.getChat.userId}
            date={data.getChat.date}
          />
        </Card>
        <Card sx={{ margin: 5 }}>
          <ProfilePicture
            userId={data.getChat.initUserId}
            date={data.getChat.initDate}
          />
          {/* <CardMedia
            component="img"
            height="%100"
            image="https://www.wyborkierowcow.pl/wp-content/uploads/2022/10/bmw-m2-coupe-cennik-sylwetka1.jpg"
            alt="Paella dish"
          /> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data.getChat.initMessage}
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
export default InitChatHeader;
