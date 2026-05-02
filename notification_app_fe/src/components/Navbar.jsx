import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    
    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eaeaea', backgroundColor: '#fff' }}>
            <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#111', letterSpacing: '-0.5px' }}>
                    Campus Notification System
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/"
                        sx={{ 
                            textTransform: 'none', 
                            color: location.pathname === '/' ? '#000' : '#666',
                            fontWeight: location.pathname === '/' ? 600 : 400
                        }}
                    >
                        All Notifications
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/priority"
                        sx={{ 
                            textTransform: 'none', 
                            color: location.pathname === '/priority' ? '#000' : '#666',
                            fontWeight: location.pathname === '/priority' ? 600 : 400
                        }}
                    >
                        Priority Inbox
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
