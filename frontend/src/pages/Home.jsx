import React, { useState } from 'react';
import {
  Container, Grid, Paper, Typography, Box, Divider
} from '@mui/material';
import UsersSelect from '../components/UsersSelect.jsx';
import UploadForm from '../components/UploadForm.jsx';
import RecordsTable from '../components/RecordsTable.jsx';
import RecordsChart from '../components/RecordsChart.jsx';
import api from '../api';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async (uId = userId, yr = year) => {
    if (!uId || !yr) return;
    setLoading(true);
    try {
      const res = await api.get(`/${uId}/${yr}`);
      setRecords(res.data.records || []);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = async () => {
    await fetchRecords();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Paper className="hero" sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Financial Records Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Upload monthly excel files and view interactive statistics immediately.
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5} md={4}>
            <UsersSelect value={userId} onChange={setUserId} />
          </Grid>

          <Grid item xs={12} sm={7} md={8}>
            <UploadForm
              userId={userId}
              year={year}
              onYearChange={setYear}
              onUploadSuccess={handleUploadSuccess}
              onShowStats={() => fetchRecords()}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Records</Typography>
            <Divider sx={{ mb: 2 }} />
            <RecordsTable records={records} loading={loading} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Monthly Summary</Typography>
            <Divider sx={{ mb: 2 }} />
            <RecordsChart records={records} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Features</Typography>
            <Box sx={{ minHeight: 80, border: '1px dashed', borderColor: 'divider', mt: 1, p: 2 }}>
              {/* empty features area */}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}