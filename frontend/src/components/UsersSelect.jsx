import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import api from "../api";

export default function UsersSelect({ value, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get("/users")
      .then((res) => {
        if (!mounted) return;
        const users = (res.data.users || []).map((u) => ({
          id: u._id,
          label: u.name,
        }));
        setOptions(users);
      })
      .catch(() => setOptions([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const selected = options.find((o) => String(o.id) === String(value)) || null;

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 300 } }}
      options={options}
      value={selected}
      getOptionLabel={(o) => o.label || ""}
      isOptionEqualToValue={(o, v) => String(o.id) === String(v?.id)}
      onChange={(_, v) => onChange(v ? v.id : "")}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="User"
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={16} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}