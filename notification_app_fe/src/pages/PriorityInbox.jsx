import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Alert } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { fetchNotifications } from '../utils/api';
import { processNotifications } from '../utils/priority';
import { Log } from 'logging-middleware';

export default function PriorityInbox() {
    const [notifications, setNotifications] = useState([]);
    const [viewedIds, setViewedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topN, setTopN] = useState(10);

    useEffect(() => {
        Log('frontend', 'info', 'page', 'Priority Inbox page loaded');
        const storedViewed = JSON.parse(localStorage.getItem('viewedNotifications') || '[]');
        setViewedIds(storedViewed);
    }, []);

    useEffect(() => {
        const loadAndProcess = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch notifications without explicit high limit to avoid 400 Bad Request
                const data = await fetchNotifications(); 
                if (data === null) {
                    setError('Failed to fetch notifications. Please check your token or network.');
                } else {
                    const sorted = await processNotifications(data);
                    setNotifications(sorted);
                }
            } catch (err) {
                setError('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        loadAndProcess();
    }, []);

    const handleTopNChange = async (event) => {
        const value = event.target.value;
        await Log('frontend', 'info', 'component', `User changed Top N to ${value}`);
        setTopN(value);
    };

    const handleView = async (id) => {
        if (!viewedIds.includes(id)) {
            const newViewed = [...viewedIds, id];
            setViewedIds(newViewed);
            localStorage.setItem('viewedNotifications', JSON.stringify(newViewed));
            await Log('frontend', 'info', 'state', `Notification ${id} marked as viewed in priority inbox`);
        }
    };

    const displayedNotifications = notifications.slice(0, topN);

    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Priority Inbox</Typography>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="top-n-label">Top N</InputLabel>
                    <Select
                        labelId="top-n-label"
                        value={topN}
                        label="Top N"
                        onChange={handleTopNChange}
                    >
                        <MenuItem value={10}>Top 10</MenuItem>
                        <MenuItem value={15}>Top 15</MenuItem>
                        <MenuItem value={20}>Top 20</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {displayedNotifications.length === 0 ? (
                        <Typography>No notifications found.</Typography>
                    ) : (
                        displayedNotifications.map((notif, index) => (
                            <NotificationCard
                                key={notif.ID || notif.id || index}
                                notification={notif}
                                isViewed={viewedIds.includes(notif.ID || notif.id || notif.title || notif.Title)}
                                onView={handleView}
                            />
                        ))
                    )}
                </>
            )}
        </Container>
    );
}
