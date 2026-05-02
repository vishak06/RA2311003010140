import { Log } from 'logging-middleware';

const TYPE_WEIGHTS = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

export async function processNotifications(notifications) {
    await Log('frontend', 'info', 'processing', 'Starting priority calculation for notifications');
    
    const processed = notifications.map(notif => {
        const type = notif.Type || notif.type;
        const weight = TYPE_WEIGHTS[type] || 0;
        const timestamp = new Date(notif.Timestamp || notif.timestamp || notif.date).getTime();
        return { ...notif, priorityWeight: weight, priorityTime: timestamp };
    });

    await Log('frontend', 'info', 'processing', 'Starting sorting process based on weight and recency');
    
    processed.sort((a, b) => {
        if (b.priorityWeight !== a.priorityWeight) {
            return b.priorityWeight - a.priorityWeight;
        }
        return b.priorityTime - a.priorityTime;
    });

    return processed;
}
