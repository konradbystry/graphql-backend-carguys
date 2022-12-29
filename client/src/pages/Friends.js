import { AuthContext } from "../context/authContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { Container, Stack } from "@mui/system";
import {
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
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import ProfilePicture from "../components/Topic/ProfilePicture";
import { CssTextField } from "../mui/styled/CssTextField";
import { useForm } from "../utility/hooks";

const GET_USER_BY_NICKNAME = gql`
  query GetUserByNickname($nickname: String!) {
    getUserByNickname(nickname: $nickname) {
      nickname
      _id
      profilePicture
    }
  }
`;

function Friends() {
  const { user } = useContext(AuthContext);
  let searchFriend = "";

  const { onChange, onSubmit, values } = useForm(
    () => refetch({ nickname: values.nickname }),
    {
      nickname: "",
    }
  );

  const { data, loading, error, refetch } = useQuery(GET_USER_BY_NICKNAME, {
    variables: { nickname: searchFriend },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  console.log(values);
  console.log(data.getUserByNickname);

  return (
    <Box marginTop={10} bgcolor={"background.default"} color={"text.primary"}>
      <Container maxWidth="sm">
        <Stack spacing={2} paddingBottom={2}>
          <CssTextField
            label="Search for friends..."
            name="nickname"
            onChange={onChange}
            sx={{ width: 500 }}
          />
        </Stack>
        <Button
          variant="contained"
          onClick={() => refetch({ nickname: values.nickname })}
        >
          Search
        </Button>
      </Container>
      <Container maxWidth="md">
        {data.getUserByNickname.map((searchedUser) => (
          <Card sx={{ margin: 5 }}>
            <Link
              to={"/user/" + searchedUser._id}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <ProfilePicture userId={searchedUser._id} date="" />
            </Link>
          </Card>
        ))}
      </Container>
    </Box>
  );
}

export default Friends;
