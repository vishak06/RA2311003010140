import fs from 'fs';
import { Log } from 'logging-middleware';

const NOTIFICATIONS_API = "http://20.207.122.201/evaluation-service/notifications";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2ajcyMzVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzU3NSwiaWF0IjoxNzc3NzAyNjc1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMzQ5ZGZiZDgtYWQ4Yy00Y2ExLWE0ZDEtMDdkMjBiMDgzMDAwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmlzaGFrIGoiLCJzdWIiOiI1YmY2OTYyNC03MGNlLTQyNTctODExZC05M2YzNGQ1YzdmOTYifSwiZW1haWwiOiJ2ajcyMzVAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ2aXNoYWsgaiIsInJvbGxObyI6InJhMjMxMTAwMzAxMDE0MCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjViZjY5NjI0LTcwY2UtNDI1Ny04MTFkLTkzZjM0ZDVjN2Y5NiIsImNsaWVudFNlY3JldCI6InpWalhiVGNiRU1XSGJOZW0ifQ.VTDcCDpFCYtGBCFpm-fHYFbJshAJaStugtqHJ8lvbW0";

const TYPE_WEIGHTS = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

async function fetchNotifications() {
    await Log('backend', 'info', 'api', 'Initiating API fetch for notifications');
    try {
        const response = await fetch(NOTIFICATIONS_API, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });

        if (!response.ok) {
            await Log('backend', 'error', 'api', `API fetch failed with status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        
        if (data && data.message === "invalid authorization token") {
            await Log('backend', 'error', 'api', 'Invalid authorization token received from API');
            return null;
        }

        const notificationsArray = data.notifications || data;

        if (!notificationsArray || !Array.isArray(notificationsArray) || notificationsArray.length === 0) {
            await Log('backend', 'warn', 'api', 'Empty or invalid response received from API');
            return [];
        }

        await Log('backend', 'info', 'api', `Successfully fetched ${notificationsArray.length} notifications`);
        return notificationsArray;
    } catch (error) {
        await Log('backend', 'fatal', 'api', `Network error during API fetch: ${error.message}`);
        return null;
    }
}

async function processNotifications(notifications) {
    await Log('backend', 'info', 'processing', 'Starting priority calculation for notifications');

    const processed = notifications.map(notif => {
        const type = notif.Type || notif.type;
        const weight = TYPE_WEIGHTS[type] || 0;
        const timestamp = new Date(notif.Timestamp || notif.timestamp || notif.date).getTime();
        return { ...notif, priorityWeight: weight, priorityTime: timestamp };
    });

    await Log('backend', 'info', 'processing', 'Starting sorting process based on weight and recency');

    processed.sort((a, b) => {
        if (b.priorityWeight !== a.priorityWeight) {
            return b.priorityWeight - a.priorityWeight;
        }
        return b.priorityTime - a.priorityTime;
    });

    return processed;
}

async function runStage1() {
    const notifications = await fetchNotifications();

    if (!notifications) {
        fs.writeFileSync('output.json', JSON.stringify({ error: 'Failed to retrieve notifications or invalid token. Aborting Stage 1.' }, null, 2));
        await Log('backend', 'error', 'core', 'Failed to retrieve notifications. Aborting Stage 1.');
        return;
    }

    if (notifications.length === 0) {
        fs.writeFileSync('output.json', JSON.stringify({ top10: [] }, null, 2));
        await Log('backend', 'info', 'core', 'Empty notifications. Generated empty output.');
        return;
    }

    const sortedNotifications = await processNotifications(notifications);
    const top10 = sortedNotifications.slice(0, 10);

    await Log('backend', 'info', 'output', 'Generating final Top 10 output');

    try {
        fs.writeFileSync('output.json', JSON.stringify({ top10 }, null, 2));
        await Log('backend', 'info', 'output', 'Successfully saved Top 10 notifications to output.json');
    } catch (e) {
        await Log('backend', 'error', 'output', `Failed to write output to file: ${e.message}`);
    }
}

runStage1();
