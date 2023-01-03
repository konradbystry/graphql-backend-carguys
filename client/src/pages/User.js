import { AuthContext } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { find } from "lodash";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { CssTextField } from "../mui/styled/CssTextField";
import StartChat from "../components/StartChat";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(ID: $id) {
      friendRequests
      friends
      nickname
      profilePicture
      description
      banner
    }
  }
`;

const SEND_FRIEND_REQUEST = gql`
  mutation Mutation($recevierId: ID!, $senderId: ID!) {
    sendFriendRequest(recevierId: $recevierId, senderId: $senderId) {
      email
      friendRequests
      friends
    }
  }
`;

function User() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  //get user
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: id },
  });

  //send friend request
  const [errors, setErrors] = useState([]);

  const [sendFriendRequest, freindRequest] = useMutation(SEND_FRIEND_REQUEST, {
    update() {
      console.log("passed");
      console.log(data);
      console.log(this.variables);
      window.location.reload();
    },
    onError({ graphQLErrors }) {
      console.log("error");
      console.log(data);
      console.log(this.variables);

      setErrors(graphQLErrors);
    },
    variables: { recevierId: id, senderId: user._id },
  });

  //loading
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  //is friend
  const friend = find(data.getUser.friends, function (friend) {
    return friend === user._id;
  });

  function userButtonAction() {
    const request = find(data.getUser.friendRequests, function (request) {
      console.log(request + " === " + id);

      return request === user._id;
    });

    if (user._id === id) {
      return <Typography></Typography>;
    }

    if (user._id !== id && friend) {
      return <HowToRegIcon />;
    }

    if (user._id !== id && !request) {
      return (
        <Button variant="contained" onClick={sendFriendRequest}>
          Add friend
        </Button>
      );
    }

    if (user._id !== id && request) {
      return <Button variant="contained">Request sent</Button>;
    }
  }

  return (
    <Box
      flex={4}
      p={2}
      marginTop={6}
      bgcolor={"background.default"}
      color={"text.primary"}
    >
      <Card sx={{ margin: 5 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={data.getUser.profilePicture}
            />
          }
          action={userButtonAction()}
          title={<Typography variant="h5">{data.getUser.nickname}</Typography>}
          subheader="Joined date"
        />
        <CardMedia
          component="img"
          height="200"
          image={data.getUser.banner}
          alt="banner"
        />
        <CardContent>
          <Typography variant="body1" mt={5} color="text.secondary">
            {data.getUser.description}
          </Typography>
        </CardContent>
        {user.admin === true && (
          <Button
            variant="contained"
            sx={{
              margin: 2,
              color: "white",
              background: "red",
            }}
          >
            Block
          </Button>
        )}
      </Card>
      {user._id !== id && <StartChat />}

      {/* {user._id !== id && (
        <Container spacing={2} maxWidth="md">
          <Stack spacing={2} paddingBottom={2}>
            <CssTextField
              label="Start chatting with friend..."
              name="text"
              multiline
              rows={3}
              onChange=""
            />
          </Stack>
          <Button variant="contained" onClick="">
            Start chat
          </Button>
        </Container>
      )} */}
    </Box>
  );
}

export default User;
