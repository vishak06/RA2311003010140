import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Campus Notification System
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        All Notifications
                    </Button>
                    <Button color="inherit" component={Link} to="/priority">
                        Priority Inbox
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
