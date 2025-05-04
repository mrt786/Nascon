# Backend Tasks Documentation

## 1. User Management System
- **Signup** (`POST /signup`): Input validation, password hashing (bcrypt), and user creation in `users` table.
- **Login** (`POST /login`): Credential validation, JWT generation (includes `id`, `email`, `role`), and authentication flow.

## 2. Role-based Access Control
- **`auth` Middleware**: Verifies JWT, attaches `req.user` (with `id`, `email`, `role`).
- **Route Protection**: Enforced per-role access on admin, event-organizer, participants, sponsors, and judges routes.

## 3. Event Management & Venue Scheduling
- **Event Submission** (`POST /send-event-for-approval`): Event organizers submit new events for admin approval.
- **Event Approval** (`POST /approve-event`): Admins approve events.
- **Event Rejection** (`DELETE /reject-event-by-admin/:event_id`): Admins reject events.
- **Get Event Details** (`GET /get-event-details`): Public endpoint to list approved events with venue information.
- **Get All Venues** (`GET /`): Lists all venues.
- **Get Venue by ID** (`GET /:id`): Retrieves details of a specific venue.

## 4. Participant Registration & Payment Tracking
- **Event Registration** (`POST /register`): Authenticated participants register for events.
- **Payment Record Creation**: Inserts into `participant_event_payments` table with `payment_status` default `false`.

## 5. Accommodation Management
- **Book Accommodation** (`POST /book`): Authenticated users book accommodations.
- **Availability Check**: Validates accommodation availability and capacity.
- **Payment Entry**: Inserts into `participant_accommodation_payments` table.

## 6. Sponsorship Management
- **View Sponsorship Packages** (`GET /approved-events`): Sponsors view packages for approved events, including sponsor levels and amounts.

## 7. Judge & Evaluation System
- **Get Assigned Events** (`GET /my-events`): Judges retrieve events they are assigned to.
- **Submit Scores** (`POST /submit-score`): Judges submit scores for participants or teams.

## 8. Reporting & Analytics (To Be Implemented)
- **Event Participation Statistics**
- **Venue Utilization Reports**
- **Financial Reports** (registration revenue, sponsorship funds)
- **Accommodation Occupancy Reports**
- **Participant Demographics**


---

# 🧩 Remaining Backend Tasks (TODO)

## 🔴 Critical
- [ ] Implement leaderboard API and winner declaration logic
- [ ] Implement audit logging (user actions like approvals, payments, etc.)

