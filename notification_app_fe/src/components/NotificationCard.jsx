import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { Log } from 'logging-middleware';

export default function NotificationCard({ notification, isViewed, onView }) {
    const handleViewClick = async () => {
        await Log('frontend', 'info', 'component', `User clicked view on notification ${notification.ID || notification.id || notification.title || notification.Title}`);
        onView(notification.ID || notification.id || notification.title || notification.Title);
    };

    return (
        <Card sx={{ mb: 2, backgroundColor: isViewed ? '#f5f5f5' : '#ffffff', borderLeft: isViewed ? 'none' : '4px solid #1976d2' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="div">
                        {notification.Title || notification.title}
                    </Typography>
                    <Chip label={notification.Type || notification.type} color="primary" size="small" />
                </Box>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {new Date(notification.Timestamp || notification.timestamp || notification.date).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                    {notification.Message || notification.message}
                </Typography>
                {!isViewed && (
                    <Button size="small" variant="outlined" onClick={handleViewClick}>
                        Mark as Viewed
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
