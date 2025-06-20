import axios from "axios";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import UserList from "@/src/components/UserList/UserList";
import { User } from "@/src/types/types";

interface LookingForProps {
  data: User[];
  error?: string;
}

export default async function LookingFor() {
  let data: User[] = [];
  let error: string | undefined;

  try {
    const response = await axios.get("http://localhost:5000/users");
    data = response.data.users;
  } catch (err) {
    error = "Не вдалося завантажити дані";
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Люди які шукають проєкт
      </Typography>
      {data?.length === 0 ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <UserList users={data} />
        </Box>
      )}
    </Box>
  );
}
