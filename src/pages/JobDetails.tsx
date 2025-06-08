import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Alert,
  Grid as MuiGrid,
  CircularProgress,
} from "@mui/material";
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

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<JobApplication>>({});

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const data = await api.getApplications();
      const found = data.find((app) => app._id === id);
      if (found) {
        setApplication(found);
        setFormData(found);
      } else {
        setError("Application not found");
      }
    } catch (err) {
      setError("Failed to load application details");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (id) {
        await api.updateApplication(id, formData);
        await fetchApplication();
        setIsEditing(false);
      }
    } catch (err) {
      setError("Failed to update application");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        if (id) {
          await api.deleteApplication(id);
          navigate("/jobs");
        }
      } catch (err) {
        setError("Failed to delete application");
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!application) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          Application not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          {isEditing ? "Edit Application" : "Application Details"}
        </Typography>
        <Box>
          {!isEditing && (
            <>
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                sx={{ mr: 2 }}
              >
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Company Name"
                  name="company"
                  value={formData.company || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Position"
                  name="position"
                  value={formData.position || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
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
                  value={formData.status || ""}
                  onChange={handleInputChange}
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
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(application);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Company
              </Typography>
              <Typography variant="body1">{application.company}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Position
              </Typography>
              <Typography variant="body1">{application.position}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Location
              </Typography>
              <Typography variant="body1">{application.location}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1">{application.status}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Notes
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {application.notes || "No notes"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Applied Date
              </Typography>
              <Typography variant="body1">
                {new Date(application.appliedDate!).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body1">
                {new Date(application.lastUpdated!).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default JobDetails;
