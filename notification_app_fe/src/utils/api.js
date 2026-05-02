import { Log } from 'logging-middleware';

const NOTIFICATIONS_API = "/evaluation-service/notifications";
const AUTH_TOKEN = import.meta.env.AUTH_TOKEN;

export async function fetchNotifications(params = {}) {
    await Log('frontend', 'info', 'api', 'Initiating API fetch for notifications');
    try {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.notification_type) queryParams.append('notification_type', params.notification_type);

        const url = `${NOTIFICATIONS_API}?${queryParams.toString()}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });

        if (!response.ok) {
            await Log('frontend', 'error', 'api', `API fetch failed with status: ${response.status}`);
            return null;
        }

        const data = await response.json();

        if (data && data.message === "invalid authorization token") {
            await Log('frontend', 'error', 'api', 'Invalid authorization token received from API');
            return null;
        }

        const notificationsArray = data.notifications || data;

        if (!notificationsArray || !Array.isArray(notificationsArray)) {
            await Log('frontend', 'warn', 'api', 'Invalid or empty response format received');
            return [];
        }

        await Log('frontend', 'info', 'api', `Successfully fetched ${notificationsArray.length} notifications`);
        return notificationsArray;
    } catch (error) {
        await Log('frontend', 'fatal', 'api', `Network error during API fetch: ${error.message}`);
        return null;
    }
}
