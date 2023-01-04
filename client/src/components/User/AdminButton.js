import { useContext } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const BLOCK_USER = gql`
  mutation Mutation($id: ID!) {
    blockUser(ID: $id) {
      nickname
      blocked
    }
  }
`;

const UNBLOCK_USER = gql`
  mutation UnblockUser($id: ID!) {
    unblockUser(ID: $id) {
      blocked
      nickname
    }
  }
`;

const GET_USER = gql`
  query Query($id: ID!) {
    getUser(ID: $id) {
      blocked
    }
  }
`;

function AdminButton() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: id },
  });

  const [blockUser, blockTarget] = useMutation(BLOCK_USER);

  const [unblockUser, unblockTarget] = useMutation(UNBLOCK_USER);

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  if (data.getUser.blocked === false || data.getUser.blocked === undefined) {
    return (
      <Button
        variant="contained"
        sx={{
          margin: 2,
          color: "white",
          background: "red",
        }}
        onClick={(e) => {
          e.preventDefault();
          blockUser({
            variables: { id: id },
            update() {
              window.location.reload();
            },
          });
        }}
      >
        Block
      </Button>
    );
  }

  if (data.getUser.blocked === true) {
    return (
      <Button
        variant="contained"
        sx={{
          margin: 2,
          color: "white",
          background: "red",
        }}
        onClick={(e) => {
          e.preventDefault();
          unblockUser({
            variables: { id: id },
            update() {
              window.location.reload();
            },
          });
        }}
      >
        Unblock
      </Button>
    );
  }
}

export default AdminButton;
