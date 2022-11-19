import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { Container, Stack } from "@mui/system";

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

  // const [acceptFreindRequest, freindRequest] = useMutation(
  //   ACCEPT_FRIEND_REQUEST,
  //   {
  //     update() {
  //       // window.location.reload();
  //       console.log("passed");
  //       console.log(data);
  //       // console.log(this.variables);
  //     },
  //     onError({ graphQLErrors }) {
  //       console.log("error");
  //       console.log(freindRequest.data);
  //       setErrors(graphQLErrors);
  //       console.log(this.variables);
  //     },
  //     variables: { recevierId: user._id, senderId: id },
  //   }
  // );

  const [acceptFreindRequest, mutation] = useMutation(ACCEPT_FRIEND_REQUEST);

  function acceptFreindRequestCallback(freindRequest) {
    console.log("test");
    acceptFreindRequest({
      variables: { recevierId: user._id, senderId: freindRequest },
    });
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <Container spacing={2} maxWidth="sm">
      <h1>This is notifications page for user {user.email}</h1>
      {data.getUser.friendRequests.map((friendRequest) => (
        <div>
          <h1>
            <Link to={"/user/" + friendRequest}>{friendRequest}</Link> send you
            freind request
          </h1>

          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              acceptFreindRequest({
                variables: { recevierId: user._id, senderId: friendRequest },
              });
            }}
          >
            Accept
          </Button>
        </div>
      ))}
    </Container>
  );
}

export default Notifications;
