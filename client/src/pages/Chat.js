import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import gql from "graphql-tag";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ProfilePicture from "../components/Topic/ProfilePicture";
import { AuthContext } from "../context/authContext";
import { CssTextField } from "../mui/styled/CssTextField";
import { useForm } from "../utility/hooks";
import ChatHeader from "../components/Chat/ChatHeader";
import InitChatHeader from "../components/Chat/InitChatHeader";

const GET_MESSAGES = gql`
  query Query($chatId: String) {
    getMessages(chatId: $chatId) {
      chatId
      date
      image
      text
      userId
      userName
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation Mutation($messageInput: MessageInput) {
    createMessage(messageInput: $messageInput) {
      chatId
      text
      userId
      userName
      image
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription Subscription {
    messageCreated {
      chatId
      date
      image
      text
      userId
      userName
    }
  }
`;

function Chat() {
  const { user } = useContext(AuthContext);
  const { chatId } = useParams();

  //image
  const [image, setImage] = useState("");
  function readImage(e) {
    const reader = new FileReader();
    let blob = e.target.files[0];
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      let base64data = reader.result;
      setImage(base64data);
    };
  }

  const { data, loading, error, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: {
      chatId: chatId,
    },
  });

  subscribeToMore({
    document: MESSAGES_SUBSCRIPTION,
    variables: {
      chatId: chatId,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newMessage = subscriptionData.data.messageCreated;
      return Object.assign({}, prev, {
        getMessages: {
          messages: [newMessage, ...prev.getMessages],
        },
      });
    },
  });

  const [errors, setErrors] = useState([]);

  function createMessageCallback() {
    createMessage();
  }

  const { onChange, onSubmit, values } = useForm(createMessageCallback, {
    chatId: chatId,
    text: "",
    userId: user._id,
    userName: user.name,
    image: "",
  });

  const [createMessage, newMessage] = useMutation(CREATE_MESSAGE, {
    update() {
      console.log(values);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
      console.log(this.variables);
    },
    variables: { messageInput: values },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  values.image = image;

  return (
    <Box flex={4} p={2} marginTop={10}>
      <InitChatHeader userId={user._id} />

      {data.getMessages.map((message) => (
        <Card sx={{ margin: 5 }}>
          <ProfilePicture userId={message.userId} date={message.date} />

          {message.image !== "" && (
            <CardMedia component="img" height="%100" image={message.image} />
          )}

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {message.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Container spacing={2} maxWidth="md">
        <Stack spacing={2} paddingBottom={2}>
          <CssTextField
            label="Write something..."
            name="text"
            multiline
            rows={3}
            onChange={onChange}
          />
        </Stack>
        {errors.map(function (error) {
          return (
            <Alert sx={{ marginBottom: 2 }} severity="warning">
              {error.message}
            </Alert>
          );
        })}
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" name="image" onChange={readImage} hidden />
        </Button>
        <br></br>
        <br></br>
        <Button variant="contained" onClick={onSubmit}>
          Send
        </Button>
      </Container>
    </Box>
  );
}

export default Chat;
