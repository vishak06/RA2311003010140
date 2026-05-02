import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Pagination, Box, CircularProgress, Alert } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { fetchNotifications } from '../utils/api';
import { Log } from 'logging-middleware';

export default function AllNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [viewedIds, setViewedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [typeFilter, setTypeFilter] = useState('All');
    const limit = 10;

    useEffect(() => {
        Log('frontend', 'info', 'page', 'All Notifications page loaded');
        const storedViewed = JSON.parse(localStorage.getItem('viewedNotifications') || '[]');
        setViewedIds(storedViewed);
    }, []);

    useEffect(() => {
        const loadNotifications = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = { page, limit };
                if (typeFilter !== 'All') {
                    params.notification_type = typeFilter;
                }
                const data = await fetchNotifications(params);
                if (data === null) {
                    setError('Failed to fetch notifications. Please check your token or network.');
                } else {
                    setNotifications(data);
                }
            } catch (err) {
                setError('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, [page, typeFilter]);

    const handleFilterChange = async (event) => {
        const newType = event.target.value;
        await Log('frontend', 'info', 'component', `User changed filter to ${newType}`);
        setTypeFilter(newType);
        setPage(1);
    };

    const handlePageChange = async (event, value) => {
        await Log('frontend', 'info', 'component', `User changed page to ${value}`);
        setPage(value);
    };

    const handleView = async (id) => {
        if (!viewedIds.includes(id)) {
            const newViewed = [...viewedIds, id];
            setViewedIds(newViewed);
            localStorage.setItem('viewedNotifications', JSON.stringify(newViewed));
            await Log('frontend', 'info', 'state', `Notification ${id} marked as viewed`);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: '#111', letterSpacing: '-1px' }}>
                    All Notifications
                </Typography>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel id="type-filter-label" sx={{ background: '#f8fafc', px: 0.5 }}>Filter by Type</InputLabel>
                    <Select
                        labelId="type-filter-label"
                        id="type-filter"
                        value={typeFilter}
                        label="Filter by Type"
                        onChange={handleFilterChange}
                        sx={{ background: '#fff' }}
                    >
                        <MenuItem value="All">All Types</MenuItem>
                        <MenuItem value="Placement">Placement</MenuItem>
                        <MenuItem value="Result">Result</MenuItem>
                        <MenuItem value="Event">Event</MenuItem>
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
                    {notifications.length === 0 ? (
                        <Typography>No notifications found.</Typography>
                    ) : (
                        notifications.map((notif, index) => (
                            <NotificationCard
                                key={notif.ID || notif.id || index}
                                notification={notif}
                                isViewed={viewedIds.includes(notif.ID || notif.id || notif.title || notif.Title)}
                                onView={handleView}
                            />
                        ))
                    )}
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                        <Pagination count={10} page={page} onChange={handlePageChange} color="primary" />
                    </Box>
                </>
            )}
        </Box>
    );
}
