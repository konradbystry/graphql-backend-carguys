import {
  Avatar,
  Box,
  Button,
  Container,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

function EditProfile() {
  const { id } = useParams();

  return (
    <Box marginTop={10}>
      <Container spacing={2} maxWidth="sm">
        <Typography variant="h5" color="text.primary">
          Edit profile {id}
        </Typography>
        <Stack spacing={2} paddingBottom={2}>
          <Avatar />
        </Stack>
        <Stack spacing={2} paddingBottom={2}>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default EditProfile;
