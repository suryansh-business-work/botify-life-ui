import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import API_LIST from "../../apiList";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  credential?: {
    credentialId: number;
    name: string;
    value: string;
    type: string;
    description?: string;
  } | null;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  value: Yup.string().required("Key is required"),
  description: Yup.string(),
});

const CreateAndUpdateManageCredentials: React.FC<Props> = ({
  open,
  onClose,
  onSuccess,
  credential,
}) => {
  const isEdit = !!credential;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: credential?.name || "",
      value: credential?.value || "",
      type: credential?.type || "",
      description: credential?.description || "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      setStatus(undefined);
      try {
        const token = localStorage.getItem("token");
        const url = isEdit
          ? API_LIST.UPDATE_CREDENTIAL(credential!.credentialId)
          : API_LIST.CREATE_CREDENTIAL;
        const method = isEdit ? "PUT" : "POST";
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(values)
        });
        const data = await res.json();
        if (res.ok) {
          onSuccess();
          onClose();
          resetForm(); 
        } else {
          setStatus(data.message || "Failed to save credential");
        }
      } catch (err) {
        setStatus("Network error");
      }
      setSubmitting(false);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <DialogTitle>{isEdit ? "Edit Credential" : "Create Credential"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Name"
            name="name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            disabled={formik.isSubmitting}
          />
          <TextField
            margin="normal"
            label="Type"
            name="type"
            fullWidth
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && !!formik.errors.type}
            helperText={formik.touched.type && formik.errors.type}
            disabled={formik.isSubmitting}
          />
          <TextField
            margin="normal"
            label="Key"
            name="value"
            fullWidth
            value={formik.values.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.value && !!formik.errors.value}
            helperText={formik.touched.value && formik.errors.value}
            disabled={formik.isSubmitting}
          />
          <TextField
            margin="normal"
            label="Description"
            name="description"
            fullWidth
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
            disabled={formik.isSubmitting}
          />
          {formik.status && (
            <div style={{ color: "red", marginTop: 8 }}>{formik.status}</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={formik.isSubmitting}>Cancel</Button>
          <Button
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {isEdit ? "Save" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateAndUpdateManageCredentials;
