import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import api from "../api";

export default function UploadForm({
  userId,
  year,
  onYearChange,
  onUploadSuccess,
  onShowStats,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitUpload = async () => {
    if (!userId) return alert("Select a user first");
    if (!file) return alert("Pick an xlsx file");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await api.post(`/upload/${userId}/${year}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data && res.data.inserted) {
        onUploadSuccess && onUploadSuccess();
      } else {
        console.info("Upload response", res.data);
      }
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.cause || err.message));
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <TextField
        label="Year"
        type="number"
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
        sx={{ width: 110 }}
        size="small"
      />

      <Button variant="outlined" component="label" size="small">
        Choose file
        <input
          hidden
          accept=".xlsx,.xls"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </Button>

      <Box sx={{ minWidth: 180 }}>
        <Typography
          noWrap
          variant="body2"
          sx={{ maxWidth: { xs: 160, sm: 220 } }}
        >
          {file
            ? `${file.name} (${Math.round(file.size / 1024)} KB)`
            : "No file chosen"}
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={submitUpload}
        disabled={!file || !userId || loading}
        size="small"
      >
        {loading ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          "Upload"
        )}
      </Button>

      <Button
        variant="outlined"
        onClick={() => onShowStats && onShowStats()}
        disabled={!userId}
        size="small"
      >
        Show statistics
      </Button>
    </Stack>
  );
}