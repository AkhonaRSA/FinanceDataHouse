import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TableContainer,
  Paper
} from '@mui/material';

const RecordsTable = ({ records = [], loading = false }) => {
  if (loading) return <Typography>Loading...</Typography>;
  if (!records || records.length === 0) return <Typography>No records</Typography>;

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 440 }}>
      <Table stickyHeader size="small" aria-label="records table">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((r) => (
            <TableRow key={r._record_id || `${r.user_id}-${r.year}-${r.month}`}>
              <TableCell>{r.month}</TableCell>
              <TableCell align="right">{Number(r.amount).toFixed(2)}</TableCell>
              <TableCell>{r.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecordsTable;