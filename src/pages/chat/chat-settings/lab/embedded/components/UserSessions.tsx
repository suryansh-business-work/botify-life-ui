
import React, { useState } from "react";
import { Box, Typography, Switch, FormControlLabel, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserSessions: React.FC = () => {
  const [authMode, setAuthMode] = useState(false); // false = Unauthenticated, true = Authenticated

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        User Session Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Configure how users interact with your bot: allow general access for unauthenticated users, or enable advanced features for authenticated users.
      </Typography>
      <Paper sx={{ p: 3, mb: 3, background: '#f7f7fa', borderRadius: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={authMode}
              onChange={() => setAuthMode((prev) => !prev)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              {authMode ? "Authenticated User Mode" : "Unauthenticated User Mode"}
            </Typography>
          }
        />
        <Typography variant="caption" color="text.secondary" display="block" mt={1}>
          {authMode
            ? "Authenticated users can access personalized and secure features."
            : "Unauthenticated users can chat generally, but advanced features are restricted."}
        </Typography>
      </Paper>
      <Box>
        {authMode ? (
          <>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Authenticated User Features
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Authenticated users can access all bot features, including:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Track support tickets" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Check order status and history" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Access personalized recommendations" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="View and update account information" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Full chat history and context" />
              </ListItem>
            </List>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Unauthenticated User Features
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Unauthenticated users can chat with the bot for general information, such as:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="FAQ and general queries" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Product or service information" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Business hours and contact details" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
                <ListItemText primary="General support (no account required)" />
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserSessions;
