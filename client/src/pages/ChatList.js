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
      initMessage
      initDate
    }
  }
`;

const CHAT_CREATED = gql`
  subscription ChatCreated {
    chatCreated {
      _id
      date
      initDate
      initMessage
      lastMessage
      secondUserId
      userId
    }
  }
`;

const CHAT_UPDATED = gql`
  subscription ChatUpdated {
    chatUpdated {
      _id
      date
      initDate
      initMessage
      lastMessage
      secondUserId
      userId
    }
  }
`;

function ChatList() {
  const { user } = useContext(AuthContext);

  const { data, loading, error, subscribeToMore } = useQuery(GET_CHATS, {
    variables: { userId: user._id },
  });

  subscribeToMore({
    document: CHAT_CREATED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const chatCreated = subscriptionData.data.chatCreated;
      return Object.assign({}, prev, {
        getChats: {
          chats: [chatCreated, ...prev.getChats],
        },
      });
    },
  });

  subscribeToMore({
    document: CHAT_UPDATED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const chatUpdated = subscriptionData.data.chatUpdated;
      return Object.assign({}, prev, {
        getChats: {
          chats: [chatUpdated, ...prev.getChats],
        },
      });
    },
  });

  function displayDate(date, initDate) {
    if (date === null || date === undefined || date === "") {
      return initDate;
    } else {
      return date;
    }
  }

  function displayLastMessage(lastMessage, initMessage) {
    if (
      lastMessage === null ||
      lastMessage === undefined ||
      lastMessage === ""
    ) {
      return initMessage;
    } else {
      return lastMessage;
    }
  }

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
      {data.getChats.length === 0 && (
        <Box marginTop={3}>
          {" "}
          <p>No active chats at the moment</p>{" "}
        </Box>
      )}

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
              <ChatHeader
                userId={chat.secondUserId}
                date={displayDate(chat.date, chat.initDate)}
              />
            )}

            {chat.secondUserId === user._id && (
              <ChatHeader userId={chat.userId} date={chat.date} />
            )}

            <CardContent>
              <Typography variant="body1" color="text.secondary">
                {displayLastMessage(chat.lastMessage, chat.initMessage)}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Box>
  );
}

export default ChatList;
