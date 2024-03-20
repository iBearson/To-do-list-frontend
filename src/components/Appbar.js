import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';

export default function Appbar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xs">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}>To-do List Application</Link> 
              </Typography>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', fontSize: '20px'}}>Dashboard</Link>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
  );
}
