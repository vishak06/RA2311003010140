import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    
    return (
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ 
            borderBottom: '1px solid rgba(255, 255, 255, 0.4)', 
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(16px)',
            zIndex: 1100
        }}>
            <Toolbar sx={{ 
                justifyContent: 'space-between', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 1.5, sm: 0 },
                py: { xs: 1.5, sm: 0 },
                px: { xs: 2, md: 4 } 
            }}>
                <Typography variant="h6" component="div" sx={{ 
                    fontWeight: 600, 
                    color: '#111', 
                    letterSpacing: '-0.5px',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    textAlign: 'center'
                }}>
                    Campus Notification System
                </Typography>
                <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/"
                        sx={{ 
                            textTransform: 'none', 
                            color: location.pathname === '/' ? '#000' : '#666',
                            fontWeight: location.pathname === '/' ? 600 : 400,
                            fontSize: { xs: '0.85rem', sm: '0.875rem' },
                            px: { xs: 1, sm: 2 }
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
                            fontWeight: location.pathname === '/priority' ? 600 : 400,
                            fontSize: { xs: '0.85rem', sm: '0.875rem' },
                            px: { xs: 1, sm: 2 }
                        }}
                    >
                        Priority Inbox
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
