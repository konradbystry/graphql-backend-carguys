import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { isNonEmptyArray } from "@apollo/client/utilities";

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
      bgcolor={"background.default"}
      color={"text.primary"}
    >
      <Box position="fixed" marginTop={10}>
        <List>
          <Link
            to="/topics/new"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText color="primary" primary="Create new topic" />
              </ListItemButton>
            </ListItem>
          </Link>
          <br></br>

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon color={"primary"} />
                </ListItemIcon>

                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to="/topics"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Topics" />
              </ListItemButton>
            </ListItem>
          </Link>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon color={"primary"} />
              </ListItemIcon>
              <ListItemText primary="Favourites" />
            </ListItemButton>
          </ListItem>

          <Link
            to={"/user/" + user._id}
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon color={"primary"} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon color={"primary"} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
