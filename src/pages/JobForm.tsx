import React, { useState } from "react";
import {
  Container,
  Grid as MuiGrid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api, JobApplication } from "../services/api";

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const application: Omit<JobApplication, "_id"> = {
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      location: formData.get("location") as string,
      status: formData.get("status") as string,
      notes: formData.get("notes") as string,
    };

    try {
      await api.createApplication(application);
      navigate("/jobs");
    } catch (err) {
      setError("Failed to create application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Application
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company Name"
                name="company"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Position"
                name="position"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Location"
                name="location"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Status"
                name="status"
                defaultValue="Applied"
                disabled={loading}
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
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/jobs")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? "Saving..." : "Save Application"}
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
