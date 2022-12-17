import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import gql from "graphql-tag";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { CssTextField } from "../mui/styled/CssTextField";
import { useForm } from "../utility/hooks";

const IS_ALREADY_CHATTING = gql`
  query IsAlreadyChatting($secondUserId: String, $userId: String) {
    isAlreadyChatting(secondUserId: $secondUserId, userId: $userId) {
      _id
      date
      secondUserId
      userId
    }
  }
`;

const CREATE_CHAT = gql`
  mutation Mutation($createChat: CreateChat) {
    createChat(createChat: $createChat) {
      _id
      date
      secondUserId
      lastMessage
      initMessage
      userId
    }
  }
`;

function StartChat() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  const { data, loading, error } = useQuery(IS_ALREADY_CHATTING, {
    variables: {
      userId: user._id,
      secondUserId: id,
    },
  });

  function startChatCallback() {
    createChat();
  }

  const { onChange, onSubmit, values } = useForm(startChatCallback, {
    userId: user._id,
    secondUserId: id,
    initMessage: "",
    initUserId: user._id,
  });

  console.log(values);

  const [createChat, chat] = useMutation(CREATE_CHAT, {
    update() {
      console.log("here hre hre herh");
      navigate("/user/" + user._id + "/chats/");
    },
    onError() {
      console.log("look");
      console.log(this.variables);
    },
    variables: { createChat: values },
  });

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  console.log(data);

  if (data.isAlreadyChatting === null || data.isAlreadyChatting === undefined) {
    return (
      <Container spacing={2} maxWidth="md">
        <Stack spacing={2} paddingBottom={2}>
          <CssTextField
            label="Start chatting with friend..."
            name="initMessage"
            multiline
            rows={3}
            onChange={onChange}
          />
        </Stack>
        <Button variant="contained" onClick={onSubmit}>
          Start chat
        </Button>
      </Container>
    );
  }

  return (
    <Container spacing={2} maxWidth="md">
      <Link
        to={"/user/" + user._id + "/chats/" + data.isAlreadyChatting._id}
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained" onClick="">
          Go to chat
        </Button>
      </Link>
    </Container>
  );
}

export default StartChat;
