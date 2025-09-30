import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavigationLink from './Shared/NavigationLink.jsx';

export default function Header() {
  return (
    <AppBar position="sticky" elevation={6} sx={{
      background: 'linear-gradient(90deg,#0f172a 0%,#0b3d91 50%,#0f172a 100%)',
      color: '#fff'
    }}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          DataHouse
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
         
        </Box>
      </Toolbar>
    </AppBar>
  );
}