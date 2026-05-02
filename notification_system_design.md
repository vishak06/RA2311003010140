# Campus Notification System Design

## Architecture Overview
The system consists of three main components:
1. **Frontend (React)**: Handles user interaction, displaying notifications, and managing the dynamic "Top N" priority inbox.
2. **Backend Proxy (Node.js)**: Acts as an optional intermediary to fetch notifications from the evaluation service, avoiding CORS issues and structuring responses if needed.
3. **Logging Middleware**: A utility module used across both frontend and backend to log all significant actions, state changes, and API interactions to a centralized evaluation logging service.

## Data Flow
- **Fetching**: The client requests notifications. This call may go through the backend proxy which forwards it to `http://20.207.122.201/evaluation-service/notifications`.
- **Processing**: The raw notifications are processed. A priority score is computed based on weight (Placement=3, Result=2, Event=1) and recency.
- **Presentation**: The frontend displays the notifications, supporting filtering, pagination, and a dynamic Top N view.

## Priority Algorithm
The priority of a notification is determined by two main factors:
1. **Weight**: Higher priority types get a larger weight.
2. **Recency**: If weights are equal, the more recent notification gets higher priority.

## Min Heap Optimization
Maintaining the Top N notifications can be efficiently handled using a Min Heap of size N. As new notifications arrive, they are compared with the minimum element (the root of the Min Heap). If the new notification has a higher priority, the root is extracted and the new notification is inserted. This keeps the memory footprint low and insertion time at `O(log N)`, making it scalable for large streams of notifications.

## Logging Strategy
The `Log` middleware is strictly enforced. It logs:
- API requests (start, success, failure)
- Data processing steps
- User interactions
No `console.log` is allowed. All logs are sent via POST to the evaluation service with proper Bearer token authorization.

## Scalability Considerations
- **Frontend**: Local storage is used for viewed status tracking, minimizing state management overhead.
- **Backend**: Kept minimal and stateless to easily scale horizontally.
- **Priority Logic**: The Min Heap approach ensures calculating the top N items is efficient even as the dataset grows.
