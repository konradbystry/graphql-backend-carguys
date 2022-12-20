import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_USER = gql`
  query Query($id: ID!) {
    getUser(ID: $id) {
      nickname
    }
  }
`;

function RightBarFriend({ friendId }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: friendId },
  });

  if (loading) return <p>loading...</p>;
  if (loading) return <p>error</p>;

  return (
    <List>
      <Link
        to={"/user/" + friendId}
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ProfilePicture friendId={friendId} />
            </ListItemIcon>
            <ListItemText color="primary" primary={data.getUser.nickname} />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );
}

export default RightBarFriend;
