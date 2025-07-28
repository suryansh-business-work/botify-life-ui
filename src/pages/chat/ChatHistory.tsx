import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControlLabel,
  Switch,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// Dummy data for demonstration
const DUMMY_HISTORY = [
  { sessionId: "sess-001", authenticated: true, messageCount: 12 },
  { sessionId: "sess-002", authenticated: false, messageCount: 5 },
  { sessionId: "sess-003", authenticated: true, messageCount: 22 },
  { sessionId: "sess-004", authenticated: false, messageCount: 3 },
  { sessionId: "sess-005", authenticated: true, messageCount: 8 },
];

const ChatHistory: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showAuthOnly, setShowAuthOnly] = useState(false);

  const filteredData = useMemo(() => {
    return DUMMY_HISTORY.filter(row => {
      const matchesSearch = row.sessionId.toLowerCase().includes(search.toLowerCase());
      const matchesAuth = showAuthOnly ? row.authenticated : true;
      return matchesSearch && matchesAuth;
    });
  }, [search, showAuthOnly]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Chat History
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        View and filter chat sessions. Search by session ID or filter by authentication status.
      </Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search Session ID"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={showAuthOnly}
              onChange={() => setShowAuthOnly(v => !v)}
              color="primary"
            />
          }
          label="Show Authenticated Only"
        />
      </Box>
      <TableContainer component={Paper} sx={{ background: '#f7f7fa' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Session ID</TableCell>
              <TableCell>Authenticated</TableCell>
              <TableCell>Message Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">No sessions found.</TableCell>
              </TableRow>
            ) : (
              filteredData.map(row => (
                <TableRow key={row.sessionId}>
                  <TableCell>{row.sessionId}</TableCell>
                  <TableCell>{row.authenticated ? "Yes" : "No"}</TableCell>
                  <TableCell>{row.messageCount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ChatHistory;