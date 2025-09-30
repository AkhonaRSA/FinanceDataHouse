import React from 'react';
import { Link as MuiLink } from '@mui/material';

export default function NavigationLink({ to = '/', children }) {
  return (
    <MuiLink
      href={to}
      underline="none"
      sx={{
        color: 'rgba(255,255,255,0.9)',
        fontWeight: 600,
        px: 1,
        '&:hover': { color: '#ffd54f' }
      }}
    >
      {children}
    </MuiLink>
  );
}