import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Divider,
  Button,
} from "@mui/material";

const Settings = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Email notifications for status updates"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Reminder for follow-ups"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Display
          </Typography>
          <FormControlLabel control={<Switch />} label="Dark mode" />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Data Management
          </Typography>
          <Button variant="outlined" color="error" sx={{ mr: 2 }}>
            Export Data
          </Button>
          <Button variant="outlined" color="error">
            Clear All Data
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
