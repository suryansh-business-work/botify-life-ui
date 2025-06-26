import React from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
  Stack,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const TECHNOLOGIES = [
  { value: "Node JS", label: "Node JS" },
  { value: "Python", label: "Python" },
];

const TEMPLATES = {
  "Node JS": [
    { value: "basic", label: "Basic Template" },
    { value: "advance", label: "Advance Template" },
  ],
  Python: [
    { value: "basic", label: "Basic Template" },
    { value: "advance", label: "Advance Template" },
  ],
};

const PURPOSES = [
  { value: "daily", label: "My Daily Life Tool" },
  { value: "iot", label: "IoT Device Management" },
  { value: "business", label: "Business Application" },
  { value: "education", label: "Education/Research" },
  { value: "automation", label: "Automation/Workflow" },
  { value: "api", label: "API Backend" },
  { value: "data", label: "Data Processing" },
  { value: "other", label: "Other" },
];

const DATABASES = [
  { value: "mongodb", label: "MongoDB" },
  { value: "postgresql", label: "PostgreSQL" },
];

const validationSchema = Yup.object({
  serverName: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(32, "Must be at most 32 characters")
    .required("MCP Server Name is required"),
  technology: Yup.string().oneOf(["Node JS", "Python"]).required("Technology is required"),
  template: Yup.string().required("Template is required"),
  purpose: Yup.string().required("Purpose is required"),
  databases: Yup.array().of(Yup.string()),
});

export interface BasicConfigValues {
  serverName: string;
  technology: "Node JS" | "Python" | "";
  template: string;
  purpose?: string;
  databases?: string[];
}

interface BasicConfigurationProps {
  initialValues?: BasicConfigValues;
  onChange?: (values: BasicConfigValues) => void;
}

const BasicConfiguration: React.FC<BasicConfigurationProps> = ({
  initialValues = {
    serverName: "",
    technology: "Node JS",
    template: "basic",
    purpose: "",
    databases: [],
  },
  onChange,
}) => {
  const formik = useFormik<BasicConfigValues>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  React.useEffect(() => {
    if (onChange) onChange(formik.values);
    // eslint-disable-next-line
  }, [formik.values]);

  const handleTechnologyChange = (_: React.MouseEvent<HTMLElement>, val: string) => {
    if (val) {
      formik.setFieldValue("technology", val);
      formik.setFieldValue("template", "");
    }
  };

  const handleTemplateChange = (_: React.MouseEvent<HTMLElement>, val: string) => {
    if (val) {
      formik.setFieldValue("template", val);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        bgcolor: "#fff",
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <form>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={700} textAlign="center" sx={{ mb: 1 }}>
            Basic Configuration
          </Typography>
          <TextField
            fullWidth
            label="MCP Server Name"
            name="serverName"
            autoFocus
            value={formik.values.serverName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.serverName && Boolean(formik.errors.serverName)}
            helperText={formik.touched.serverName && formik.errors.serverName}
            autoComplete="off"
            inputProps={{ maxLength: 32 }}
          />

          {/* Purpose Dropdown */}
          <FormControl
            fullWidth
            error={formik.touched.purpose && Boolean(formik.errors.purpose)}
          >
            <InputLabel id="purpose-label">
              You are creating MCP server for
            </InputLabel>
            <Select
              labelId="purpose-label"
              id="purpose"
              name="purpose"
              label="You are creating MCP server for"
              value={formik.values.purpose || ""}
              onChange={formik.handleChange}
            >
              {PURPOSES.map((p) => (
                <MenuItem key={p.value} value={p.value}>
                  {p.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.purpose && formik.errors.purpose}
            </FormHelperText>
          </FormControl>

          {/* Database Multi-Select */}
          <FormControl fullWidth>
            <InputLabel id="databases-label">Databases</InputLabel>
            <Select
              labelId="databases-label"
              id="databases"
              multiple
              name="databases"
              value={formik.values.databases || []}
              onChange={formik.handleChange}
              input={<OutlinedInput label="Databases" />}
              renderValue={(selected) =>
                (selected as string[])
                  .map(
                    (val) =>
                      DATABASES.find((db) => db.value === val)?.label || val
                  )
                  .join(", ")
              }
            >
              {DATABASES.map((db) => (
                <MenuItem key={db.value} value={db.value}>
                  <Checkbox checked={formik.values.databases?.includes(db.value) || false} />
                  <ListItemText primary={db.label} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              (Optional) Select one or more databases for your MCP server.<br />
              <b>If you select this, the configuration will be sent to your email.</b>
            </FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            error={formik.touched.technology && Boolean(formik.errors.technology)}
          >
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              Technology
            </Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={formik.values.technology}
              onChange={handleTechnologyChange}
              sx={{ width: "100%" }}
            >
              {TECHNOLOGIES.map((tech) => (
                <ToggleButton
                  key={tech.value}
                  value={tech.value}
                  sx={{ flex: 1, textTransform: "capitalize", minHeight: 44 }}
                >
                  {tech.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <FormHelperText>
              {formik.touched.technology && formik.errors.technology}
            </FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            error={formik.touched.template && Boolean(formik.errors.template)}
            disabled={!formik.values.technology}
          >
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              Template
            </Typography>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={formik.values.template}
              onChange={handleTemplateChange}
              sx={{ width: "100%" }}
            >
              {formik.values.technology &&
                TEMPLATES[formik.values.technology as "Node JS" | "Python"].map((tpl) => (
                  <ToggleButton
                    key={tpl.value}
                    value={tpl.value}
                    sx={{ flex: 1, textTransform: "capitalize", minHeight: 44 }}
                  >
                    {tpl.label}
                  </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <FormHelperText>
              {formik.touched.template && formik.errors.template}
            </FormHelperText>
          </FormControl>
        </Stack>
      </form>
    </Paper>
  );
};

export default BasicConfiguration;