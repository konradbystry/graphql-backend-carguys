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
import ChatHeader from "../components/Chat/ChatHeader";

const GET_CHATS = gql`
  query Query($userId: String) {
    getChats(userId: $userId) {
      _id
      secondUserId
      userId
      lastMessage
      date
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
            {chat.userId === user._id && (
              <ChatHeader userId={chat.secondUserId} date={chat.date} />
            )}

            {chat.secondUserId === user._id && (
              <ChatHeader userId={chat.userId} date={chat.date} />
            )}

            <CardContent>
              <Typography variant="body1" color="text.secondary">
                {chat.lastMessage}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
}

export default ChatList;
