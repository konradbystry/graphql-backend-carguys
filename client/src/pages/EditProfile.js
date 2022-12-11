import { gql, useMutation } from "@apollo/client";
import {
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

import { useParams } from "react-router-dom";
import { CssTextField } from "../mui/styled/CssTextField";
import { useForm } from "../utility/hooks";

const EDIT_USER = gql`
  mutation Mutation($editInput: EditInput) {
    editUser(editInput: $editInput) {
      _id
    }
  }
`;

function EditProfile() {
  const { id } = useParams();

  function editUserCallback() {
    editUser();
  }

  const [editUser, user] = useMutation(EDIT_USER);

  const { onChange, onSubmit, values } = useForm(editUserCallback, {
    id: id,
    profilePicture: "",
    banner: "",
    nickname: "",
    description: "",
  });

  console.log(values);

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
        <Stack spacing={2} paddingBottom={2} mt={2}>
          <Typography>Profile picture</Typography>
          <Avatar sx={{ bgcolor: "grey", width: 100, height: 100 }} />
        </Stack>
        <Stack spacing={2} paddingBottom={2}>
          <Button
            variant="contained"
            component="label"
            sx={{ width: { xs: 300, md: 600 } }}
          >
            Upload File
            <input type="file" hidden />
          </Button>

          <Typography>Banner</Typography>
          <Card sx={{ margin: 5 }}>
            <CardMedia
              component="img"
              height="100"
              image="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960"
            />
          </Card>

          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              name="profilePicture"
              onChange={onChange}
              hidden
            />
          </Button>

          <CssTextField label="Nickname" name="nickname" onChange={onChange} />
          <CssTextField
            label="Profile description"
            name="description"
            multiline
            rows={3}
            onChange={onChange}
          />

          <Button variant="contained">Update</Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default EditProfile;
