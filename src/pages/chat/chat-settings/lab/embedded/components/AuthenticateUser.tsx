
import React, { useState } from "react";
import { Box, Typography, Switch, FormControlLabel, Paper, TextField, Button } from "@mui/material";

const AuthenticateUser: React.FC = () => {
  const [authEnabled, setAuthEnabled] = useState(false);
  const [emailDomain, setEmailDomain] = useState("");

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        User Authentication Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Enable or disable authentication for your chat users. When enabled, users must authenticate (e.g., via email) to access advanced features.
      </Typography>
      <Paper sx={{ p: 3, mb: 3, background: '#f7f7fa', borderRadius: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={authEnabled}
              onChange={() => setAuthEnabled((prev) => !prev)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              {authEnabled ? "Authentication Enabled" : "Authentication Disabled"}
            </Typography>
          }
        />
        <Typography variant="caption" color="text.secondary" display="block" mt={1}>
          {authEnabled
            ? "Users will be required to authenticate before accessing advanced chat features."
            : "Anyone can chat without authentication. Only general features will be available."}
        </Typography>
      </Paper>
      {authEnabled && (
        <Paper sx={{ p: 3, background: '#fff', borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Email Authentication
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Require users to authenticate using their email address. Optionally, restrict access to specific email domains (e.g., company email only).
          </Typography>
          <TextField
            label="Allowed Email Domain (optional)"
            placeholder="example.com"
            value={emailDomain}
            onChange={e => setEmailDomain(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" disabled>
            Save Settings
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default AuthenticateUser;
