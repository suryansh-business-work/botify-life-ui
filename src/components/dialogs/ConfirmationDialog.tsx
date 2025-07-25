import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  apiPath: string;
  method?: "DELETE" | "POST" | "PATCH";
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  headers?: Record<string, string>;
  extensive?: boolean; // <-- New prop
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onSuccess,
  apiPath,
  method = "DELETE",
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  extensive = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmInput, setConfirmInput] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.request({
        url: apiPath,
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (res.status >= 200 && res.status < 300) {
        if (onSuccess) onSuccess();
        onClose();
      } else {
        let msg = res.data?.message || "Failed to perform action";
        setError(msg);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Network error"
      );
    }
    setLoading(false);
  };

  // Reset confirm input when dialog opens/closes
  React.useEffect(() => {
    if (!open) setConfirmInput("");
  }, [open]);

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" py={2}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography sx={{ mb: 2 }}>{description}</Typography>
        {extensive && (
          <>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <strong>Warning:</strong> This action is irreversible. Please type <b>delete</b> below to confirm. <br />
              <span style={{ color: "#555" }}>
                <b>Note:</b> Once deleted, this item cannot be restored.
              </span>
            </Alert>
            <TextField
              autoFocus
              fullWidth
              label='Type "delete" to confirm'
              value={confirmInput}
              onChange={e => setConfirmInput(e.target.value)}
              disabled={loading}
              sx={{ mb: 1 }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={loading || (extensive && confirmInput.trim().toLowerCase() !== "delete")}
          startIcon={loading ? <CircularProgress size={18} /> : undefined}
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;