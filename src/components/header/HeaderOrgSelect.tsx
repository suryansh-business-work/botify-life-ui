import React, { useEffect, useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, CircularProgress, Box } from "@mui/material";
import API_LIST from "../../apiList";

interface Organization {
  organizationId: string;
  organizationName: string;
  selected?: boolean;
}

interface HeaderOrgSelectProps {
  value?: string;
  onChange?: (orgId: string) => void;
}

const HeaderOrgSelect: React.FC<HeaderOrgSelectProps> = ({ value, onChange }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string>("");

  // Fetch organizations and set selected based on API response
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

          // Find selected from API response
          const selectedFromApi = data.data.find((org: Organization) => org.selected);
          if (selectedFromApi) {
            setSelectedOrg(selectedFromApi.organizationId);
            onChange?.(selectedFromApi.organizationId);
          } else if (data.data.length > 0) {
            setSelectedOrg(data.data[0].organizationId);
            onChange?.(data.data[0].organizationId);
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
    }
  }, [value]);

  const handleChange = async (e: any) => {
    const orgId = e.target.value;
    setSelectedOrg(orgId);
    onChange?.(orgId);

    // Show loader while changing organization
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_LIST.ORGANIZATION_BASE}/update-selected`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ organizationId: orgId }),
      });
      // Refetch organizations to update selected status
      const res = await fetch(`${API_LIST.ORGANIZATION_BASE}/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.data)) {
        setOrganizations(data.data);
      }
    } catch {
      // Optionally handle error
    }
    setLoading(false);
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
        renderValue={selected => {
          if (loading) {
            return (
              <Box display="flex" alignItems="center">
                <CircularProgress size={18} sx={{ mr: 1 }} /> Loading...
              </Box>
            );
          }
          const org = organizations.find(o => o.organizationId === selected);
          return org ? org.organizationName : "Select organization";
        }}
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