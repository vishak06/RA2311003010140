import { Log } from 'logging-middleware';

const NOTIFICATIONS_API = "http://20.207.122.201/evaluation-service/notifications";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2ajcyMzVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDM5NSwiaWF0IjoxNzc3Njk5NDk1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTBhNDNmZDQtOTMzNy00MDY2LWJkODItYTBlOTEzMGRhNjgxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmlzaGFrIGoiLCJzdWIiOiI1YmY2OTYyNC03MGNlLTQyNTctODExZC05M2YzNGQ1YzdmOTYifSwiZW1haWwiOiJ2ajcyMzVAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ2aXNoYWsgaiIsInJvbGxObyI6InJhMjMxMTAwMzAxMDE0MCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjViZjY5NjI0LTcwY2UtNDI1Ny04MTFkLTkzZjM0ZDVjN2Y5NiIsImNsaWVudFNlY3JldCI6InpWalhiVGNiRU1XSGJOZW0ifQ.-_3GdwCj30zVPZZBx5YYDN_IB9rBr5dL6sb7p5eHiaU";

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

        if (!data || !Array.isArray(data)) {
            await Log('frontend', 'warn', 'api', 'Invalid or empty response format received');
            return [];
        }

        await Log('frontend', 'info', 'api', `Successfully fetched ${data.length} notifications`);
        return data;
    } catch (error) {
        await Log('frontend', 'fatal', 'api', `Network error during API fetch: ${error.message}`);
        return null;
    }
}
