import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Input,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { CssTextField } from "../mui/styled/CssTextField";
import { useForm } from "../utility/hooks";
import { useState } from "react";

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(ID: $id) {
      nickname
      profilePicture
      banner
      description
    }
  }
`;

const EDIT_USER = gql`
  mutation Mutation($editInput: EditInput) {
    editUser(editInput: $editInput) {
      _id
    }
  }
`;

function EditProfile() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [banner, setBanner] = useState();
  function changeBanner(e) {
    const reader = new FileReader();
    let blob = e.target.files[0];
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      let base64data = reader.result;
      setBanner(base64data);
    };
  }

  const [profilePicture, setProfilePicture] = useState();
  function changeProfilePicture(e) {
    const reader = new FileReader();
    let blob = e.target.files[0];
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      let base64data = reader.result;
      setProfilePicture(base64data);
    };
  }

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: id },
  });

  const [errors, setErrors] = useState([]);

  function editUserCallback() {
    editUser();
  }

  const { onChange, onSubmit, values } = useForm(editUserCallback, {
    id: id,
    profilePicture: "",
    banner: "",
    nickname: "",
    description: "",
  });

  const [editUser, user] = useMutation(EDIT_USER, {
    update() {
      navigate("/user/" + id);
      window.location.reload();
    },
    variables: {
      editInput: values,
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  console.log(values);
  values.banner = banner;
  values.profilePicture = profilePicture;

  return (
    <Box marginTop={10}>
      <Container
        spacing={2}
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="text.primary">
          Edit profile
        </Typography>

        <Typography mt={4}>Current profile picture</Typography>
        <Avatar
          src={data.getUser.profilePicture}
          sx={{ bgcolor: "grey", width: 100, height: 100, margin: 2 }}
        />

        <Typography>New profile picture</Typography>
        <Avatar
          src={profilePicture}
          sx={{ bgcolor: "grey", width: 100, height: 100, margin: 2 }}
        />

        <Stack spacing={2} paddingBottom={2}>
          <Button
            variant="contained"
            component="label"
            sx={{ width: { xs: 300, md: 600 }, marginBottom: 5 }}
          >
            Upload File
            <input
              type="file"
              name="profilePicture"
              onChange={changeProfilePicture}
              hidden
            />
          </Button>

          <Typography>Current banner</Typography>
          <Card sx={{ margin: 5 }}>
            <CardMedia
              component="img"
              height="100"
              image={data.getUser.banner}
            />
          </Card>
          <Typography>New banner</Typography>
          <Card sx={{ margin: 5 }}>
            <CardMedia component="img" height="100" image={banner} />
          </Card>

          <br></br>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" name="banner" onChange={changeBanner} hidden />
          </Button>
          <br></br>
          <br></br>
          <Typography>Current nickname</Typography>
          <Typography variant="h5">{data.getUser.nickname}</Typography>
          <br></br>
          <CssTextField
            label="New nickname"
            name="nickname"
            onChange={onChange}
          />
          <br></br>
          <Typography>Current description</Typography>
          <Typography variant="h5">{data.getUser.description}</Typography>
          <br></br>
          <CssTextField
            label="New description"
            name="description"
            multiline
            rows={3}
            onChange={onChange}
          />

          <Button variant="contained" onClick={onSubmit}>
            Update
          </Button>
          {errors.map(function (error) {
            return (
              <Alert sx={{ marginTop: 2 }} severity="error">
                {error.message}
              </Alert>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}

export default EditProfile;
