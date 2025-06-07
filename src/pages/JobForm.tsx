import React from "react";
import {
  Container,
  Grid as MuiGrid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Grid = MuiGrid as React.ComponentType<any>;

const statusOptions = [
  "Applied",
  "Interview Scheduled",
  "Interviewed",
  "Offer Received",
  "Rejected",
  "Withdrawn",
];

const JobForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement form submission
    navigate("/jobs");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Application
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company Name"
                name="company"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Position" name="position" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Location" name="location" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Status"
                name="status"
                defaultValue="Applied"
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                name="notes"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={() => navigate("/jobs")}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save Application
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default JobForm;
