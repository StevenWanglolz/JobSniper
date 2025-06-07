import React from "react";
import {
  Container,
  Grid as MuiGrid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Grid = MuiGrid as React.ComponentType<any>;

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: 140,
              cursor: "pointer",
            }}
            onClick={() => navigate("/jobs")}
          >
            <Typography variant="h6" gutterBottom>
              Total Applications
            </Typography>
            <Typography variant="h3" component="div">
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: 140,
              cursor: "pointer",
            }}
            onClick={() => navigate("/jobs")}
          >
            <Typography variant="h6" gutterBottom>
              Active Applications
            </Typography>
            <Typography variant="h3" component="div">
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: 140,
              cursor: "pointer",
            }}
            onClick={() => navigate("/jobs")}
          >
            <Typography variant="h6" gutterBottom>
              Interviews Scheduled
            </Typography>
            <Typography variant="h3" component="div">
              0
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
