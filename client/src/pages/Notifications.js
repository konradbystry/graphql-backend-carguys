import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { Container, Stack } from "@mui/system";
import FriendRequestHeader from "../components/Notifications/FriendRequestHeader";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(ID: $id) {
      friendRequests
    }
  }
`;

const ACCEPT_FRIEND_REQUEST = gql`
  mutation Mutation($recevierId: ID!, $senderId: ID!) {
    acceptFriendRequest(recevierId: $recevierId, senderId: $senderId) {
      _id
      email
    }
  }
`;

function Notifications() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: user._id },
  });

  const [errors, setErrors] = useState([]);

  const [acceptFreindRequest, mutation] = useMutation(ACCEPT_FRIEND_REQUEST, {
    update() {
      window.location.reload();
    },
  });

  function acceptFreindRequestCallback(freindRequest) {
    acceptFreindRequest({
      variables: { recevierId: user._id, senderId: freindRequest },
    });
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <Box marginTop={10}>
      <Container spacing={2} maxWidth="sm">
        <Typography variant="h5">Friend requests</Typography>
        {data.getUser.friendRequests.map((friendRequest) => (
          <Card sx={{ margin: 5 }}>
            {/* <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "grey" }} aria-label="recipe">
                  R
                </Avatar>
              }
              title={friendRequest}
              subheader="Want to be your friend"
            /> */}

            <FriendRequestHeader userId={friendRequest} />

            <CardContent>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  acceptFreindRequest({
                    variables: {
                      recevierId: user._id,
                      senderId: friendRequest,
                    },
                  });
                }}
              >
                Accept
              </Button>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
}

export default Notifications;
