import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import UsersSelect from './components/UsersSelect';
import UploadForm from './components/UploadForm';
import RecordsTable from './components/RecordsTable';
import RecordsChart from './components/RecordsChart';
import api from './api';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then(r => setUsers(r.data.users || []))
      .catch(() => setUsers([]));
  }, []);

  const fetchRecords = async (userId, yearVal) => {
    if (!userId || !yearVal) return;
    const res = await api.get(`/${userId}/${yearVal}`);
    if (res.data && res.data.records) setRecords(res.data.records);
  };

  return (
    <>
     
      <CssBaseline />
      <Header />
        <Home />
      <Container sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>DataHouse - Finances</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <UsersSelect users={users} value={selectedUser} onChange={setSelectedUser} />
            <UploadForm userId={selectedUser} year={year} onSuccess={() => fetchRecords(selectedUser, year)} onYearChange={setYear}/>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, mb: 3 }}>
          <RecordsTable records={records} />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <RecordsChart records={records} />
        </Paper>
      </Container>
      
    </>
  );
}
