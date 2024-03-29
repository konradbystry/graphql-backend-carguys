import { useQuery } from "@apollo/client";
import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import GroupsIcon from "@mui/icons-material/Groups";
import ProfilePicture from "./Friends/ProfilePicture";
import RightBarFriend from "./Friends/RightBarFriend";

// const GET_FRIENDS = gql`
//   query GetFriends($friends: [ID]) {
//     getFriends(friends: $friends) {
//       nickname
//       _id
//     }
//   }
// `;

const GET_USER = gql`
  query Query($id: ID!) {
    getUser(ID: $id) {
      friends
    }
  }
`;

function Rightbar() {
  const { user } = useContext(AuthContext);

  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id: user._id },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  console.log(data);

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width="300" marginTop={10}>
        <List>
          <Link
            to={"/user/" + user._id + "/friends"}
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <GroupsIcon
                    color={"primary"}
                    sx={{ width: 40, height: 40 }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="h5">Friends</Typography>}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>

        {data.getUser.friends.length === 0 && (
          <p>
            Click on friends icon and search for friends! Your firend list will
            be displayed here
          </p>
        )}

        {data.getUser.friends.map((friendId) => (
          <RightBarFriend friendId={friendId} />
          // <List>
          //   <Link
          //     to={"/user/" + friend._id}
          //     style={{
          //       textDecoration: "none",
          //       color: "white",
          //     }}
          //   >
          //     <ListItem disablePadding>
          //       <ListItemButton>
          //         <ListItemIcon>
          //           <ProfilePicture friendId={friend._id} />
          //         </ListItemIcon>
          //         <ListItemText color="primary" primary={friend.nickname} />
          //       </ListItemButton>
          //     </ListItem>
          //   </Link>
          // </List>
        ))}
        {/* <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src="" />
          <Avatar alt="Travis Howard" src="" />
          <Avatar alt="Cindy Baker" src="" />
          <Avatar alt="Agnes Walker" src="" />
          <Avatar alt="Trevor Henderson" src="" />
        </AvatarGroup>
        <Typography variant="h6" mt={2} mb={2}>
          Latest conversations
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List> */}
      </Box>
    </Box>
  );
}

export default Rightbar;
