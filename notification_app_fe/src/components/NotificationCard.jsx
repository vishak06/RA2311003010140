import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { Log } from 'logging-middleware';
import CircleIcon from '@mui/icons-material/Circle';

export default function NotificationCard({ notification, isViewed, onView }) {
    const handleViewClick = async () => {
        await Log('frontend', 'info', 'component', `User clicked view on notification ${notification.ID || notification.id || notification.title || notification.Title}`);
        onView(notification.ID || notification.id || notification.title || notification.Title);
    };

    const typeColors = {
        'Placement': 'success',
        'Result': 'info',
        'Event': 'secondary'
    };

    const chipColor = typeColors[notification.Type || notification.type] || 'default';

    return (
        <Card 
            elevation={0}
            sx={{ 
                mb: 2, 
                border: '1px solid',
                borderColor: isViewed ? '#eaeaea' : '#e3f2fd',
                backgroundColor: isViewed ? '#fafafa' : '#ffffff',
                transition: 'box-shadow 0.2s',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }
            }}
        >
            <CardContent sx={{ pb: '16px !important' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!isViewed && <CircleIcon sx={{ fontSize: 10, color: '#1976d2' }} />}
                        <Typography variant="h6" component="div" sx={{ fontWeight: isViewed ? 500 : 600, color: isViewed ? '#555' : '#111', fontSize: '1.1rem' }}>
                            {notification.Title || notification.title}
                        </Typography>
                    </Box>
                    <Chip 
                        label={notification.Type || notification.type} 
                        color={chipColor} 
                        size="small" 
                        variant={isViewed ? "outlined" : "filled"}
                        sx={{ fontWeight: 500 }}
                    />
                </Box>
                <Typography variant="body2" sx={{ mb: 2, color: isViewed ? '#777' : '#444', lineHeight: 1.6 }}>
                    {notification.Message || notification.message}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography sx={{ fontSize: 12, color: '#999', fontWeight: 500 }}>
                        {new Date(notification.Timestamp || notification.timestamp || notification.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </Typography>
                    {!isViewed && (
                        <Button 
                            size="small" 
                            onClick={handleViewClick}
                            sx={{ textTransform: 'none', fontWeight: 600, px: 2 }}
                        >
                            Mark as Read
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
