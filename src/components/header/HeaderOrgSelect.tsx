import React, { useEffect, useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, CircularProgress, Box } from "@mui/material";
import API_LIST from "../../apiList";

interface Organization {
  organizationId: string;
  organizationName: string;
}

interface HeaderOrgSelectProps {
  value?: string;
  onChange?: (orgId: string) => void;
}

const LOCAL_STORAGE_KEY = "selectedOrganizationId";

const HeaderOrgSelect: React.FC<HeaderOrgSelectProps> = ({ value, onChange }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string>("");

  // Fetch organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_LIST.ORGANIZATION_BASE}/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.data)) {
          setOrganizations(data.data);

          // If nothing selected, select first org by default
          let orgId = value || localStorage.getItem(LOCAL_STORAGE_KEY) || "";
          if (!orgId && data.data.length > 0) {
            orgId = data.data[0].organizationId;
            setSelectedOrg(orgId);
            localStorage.setItem(LOCAL_STORAGE_KEY, orgId);
            onChange?.(orgId);
          } else if (orgId) {
            setSelectedOrg(orgId);
          }
        }
      } catch {
        setOrganizations([]);
      }
      setLoading(false);
    };
    fetchOrganizations();
    // eslint-disable-next-line
  }, []);

  // Sync with value prop if provided
  useEffect(() => {
    if (value) {
      setSelectedOrg(value);
      localStorage.setItem(LOCAL_STORAGE_KEY, value);
    }
  }, [value]);

  const handleChange = (e: any) => {
    const orgId = e.target.value;
    setSelectedOrg(orgId);
    localStorage.setItem(LOCAL_STORAGE_KEY, orgId);
    onChange?.(orgId);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="org-select-label">Organization</InputLabel>
      <Select
        labelId="org-select-label"
        value={selectedOrg}
        label="Organization"
        onChange={handleChange}
        disabled={loading}
      >
        <MenuItem value="">
          <em>Select organization</em>
        </MenuItem>
        {loading ? (
          <MenuItem value="">
            <Box display="flex" alignItems="center">
              <CircularProgress size={18} sx={{ mr: 1 }} /> Loading...
            </Box>
          </MenuItem>
        ) : organizations.length === 0 ? (
          <MenuItem value="">No organizations found</MenuItem>
        ) : (
          organizations.map(org => (
            <MenuItem key={org.organizationId} value={org.organizationId}>
              {org.organizationName}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default HeaderOrgSelect;