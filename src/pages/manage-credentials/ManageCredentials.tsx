import React, { useState, useEffect } from "react";
import API_LIST from "../../apiList";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog";

type Credential = {
  id: number;
  name: string;
  value: string;
  type: string;
  description?: string;
};

const LOCAL_STORAGE_KEY = "selectedOrganizationId";

const ManageCredentials: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dialog state
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState<Credential | null>(null);
  const [openDelete, setOpenDelete] = useState<Credential | null>(null);

  // Form state for create/edit
  const [form, setForm] = useState({ name: "", value: "", type: "", description: "" });

  // Fetch all credentials
  const fetchCredentials = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_LIST.GET_CREDENTIALS);
      const data = await res.json();
      if (res.ok) {
        setCredentials(data.data || []);
      } else {
        setError(data.message || "Failed to fetch credentials");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  // Handlers
  const handleOpenCreate = () => {
    setForm({ name: "", value: "", type: "", description: "" });
    setOpenCreate(true);
  };

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const selectedOrganizationId = localStorage.getItem(LOCAL_STORAGE_KEY);
      const res = await fetch(API_LIST.CREATE_CREDENTIAL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, organizationId: selectedOrganizationId }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchCredentials();
        setOpenCreate(false);
      } else {
        setError(data.message || "Failed to create credential");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  const handleOpenEdit = (cred: Credential) => {
    setForm({ name: cred.name, value: cred.value, type: cred.type, description: cred.description || "" });
    setOpenEdit(cred);
  };

  const handleEdit = async () => {
    if (!openEdit) return;
    setLoading(true);
    setError(null);
    try {
      const selectedOrganizationId = localStorage.getItem(LOCAL_STORAGE_KEY);
      const res = await fetch(API_LIST.UPDATE_CREDENTIAL(openEdit.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, organizationId: selectedOrganizationId }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchCredentials();
        setOpenEdit(null);
      } else {
        setError(data.message || "Failed to update credential");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  const handleOpenDelete = (cred: Credential) => {
    setOpenDelete(cred);
  };

  // Use ConfirmationDialog for delete
  const handleDeleteSuccess = () => {
    setOpenDelete(null);
    fetchCredentials();
  };

  // // Pass organizationId in body for delete
  // const getDeleteBody = () => {
  //   const selectedOrganizationId = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   return JSON.stringify({ organizationId: selectedOrganizationId });
  // };

  return (
    <Box sx={{ py: 4, px: { xs: 1, md: 4 } }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Manage Credentials
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ borderRadius: 2, fontWeight: 600, px: 2 }}
          onClick={handleOpenCreate}
        >
          Create Credential
        </Button>
      </Box>
      <Paper elevation={2} sx={{ p: 0, borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Key</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary">Loading...</Typography>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              ) : credentials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary">No credentials found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                credentials.map((cred) => (
                  <TableRow key={cred.id}>
                    <TableCell>{cred.name}</TableCell>
                    <TableCell>{cred.type}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <VisibilityOffIcon fontSize="small" color="disabled" />
                        <Typography variant="body2" sx={{ letterSpacing: 1 }}>
                          {cred.value}
                        </Typography>
                        <Tooltip title="Copy Key">
                          <IconButton size="small" onClick={() => navigator.clipboard.writeText(cred.value)}>
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                    <TableCell>{cred.description || "-"}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenEdit(cred)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleOpenDelete(cred)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create Credential Dialog */}
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Create Credential</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <TextField
            margin="normal"
            label="Type"
            fullWidth
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          />
          <TextField
            margin="normal"
            label="Key"
            fullWidth
            value={form.value}
            onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
          />
          <TextField
            margin="normal"
            label="Description"
            fullWidth
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!form.name || !form.type || !form.value}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Credential Dialog */}
      <Dialog
        open={!!openEdit}
        onClose={() => setOpenEdit(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Edit Credential</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <TextField
            margin="normal"
            label="Type"
            fullWidth
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          />
          <TextField
            margin="normal"
            label="Key"
            fullWidth
            value={form.value}
            onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
          />
          <TextField
            margin="normal"
            label="Description"
            fullWidth
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleEdit}
            disabled={!form.name || !form.type || !form.value}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Credential Dialog using ConfirmationDialog */}
      <ConfirmationDialog
        open={!!openDelete}
        onClose={() => setOpenDelete(null)}
        onSuccess={handleDeleteSuccess}
        apiPath={openDelete ? API_LIST.DELETE_CREDENTIAL(openDelete.id) : ""}
        title="Delete Credential"
        description={
          openDelete
            ? `Are you sure you want to delete "${openDelete.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        method="DELETE"
        extensive={true}
      />
    </Box>
  );
};

export default ManageCredentials;