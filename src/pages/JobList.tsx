import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { api, JobApplication } from "../services/api";

const JobList = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await api.getApplications();
      setApplications(data);
    } catch (err) {
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Job Applications
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/jobs/new")}
        >
          Add Application
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : applications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography>
              No applications yet. Click "Add Application" to get started.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow
                  key={application._id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/jobs/${application._id}`)}
                >
                  <TableCell>{application.company}</TableCell>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>{application.status}</TableCell>
                  <TableCell>{formatDate(application.appliedDate!)}</TableCell>
                  <TableCell>{formatDate(application.lastUpdated!)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default JobList;
