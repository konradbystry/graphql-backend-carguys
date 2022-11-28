import { React, useContext } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const GET_CHATS = gql`
  query Query($userId: String) {
    getChats(userId: $userId) {
      _id
      secondUserId
      userId
    }
  }
`;

function ChatList() {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_CHATS, {
    variables: { userId: user._id },
  });

  function link(userId, secondUserId) {
    if (userId === user._id) {
      return "/user/" + secondUserId;
    }

    if (secondUserId === user._id) {
      return "/user/" + userId;
    }
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  console.log(data);

  return (
    <Box marginTop={10}>
      <Typography variant="h5">Chats</Typography>
      {data.getChats.map((chat) => (
        <Link
          to={"/user/" + user._id + "/chats/" + chat._id}
          style={{
            textDecoration: "none",
            color: "grey",
          }}
        >
          <Card sx={{ margin: 5 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "grey" }} aria-label="recipe">
                  U
                </Avatar>
              }
              title={
                <Link
                  to={link(chat.userId, chat.secondUserId)}
                  style={{
                    textDecoration: "none",
                    color: "grey",
                  }}
                >
                  {chat.userId === user._id && (
                    <Typography>{chat.secondUserId}</Typography>
                  )}
                  {chat.secondUserId === user._id && (
                    <Typography>{chat.userId}</Typography>
                  )}
                </Link>
              }
              subheader="date"
            />
            {/* <CardMedia
            component="img"
            height="%100"
            image="https://www.wyborkierowcow.pl/wp-content/uploads/2022/10/bmw-m2-coupe-cennik-sylwetka1.jpg"
            alt="Paella dish"
          /> */}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                last msg
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
}

export default ChatList;
