import React from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import ProjectsList from "../components/ProjectList/ProjectsList";

export default async function Home() {
  const response = await axios.get(`${process.env.API_BASE_URL}/projects`);
  const projects: any[] = response?.data?.projects;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Проєкти в яких ви можете взяти участь
      </Typography>
      <Box>
        {projects ? (
          <ProjectsList projects={projects} />
        ) : (
          <Box>
            <Typography>Тут поки що порожньо</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
