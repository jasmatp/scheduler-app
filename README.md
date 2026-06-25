# MERN Scheduler

A Calendly-like scheduling application built using the MERN stack that allows users to create availability slots, generate booking links, and accept bookings from public visitors.

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Material UI (MUI)
* React Hook Form
* Axios
* React Toastify

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Dashboard Routes

### Availability Management

* Select date, start time, and end time
* Save availability slots
* Display saved availability locally after save
* Generate public booking link

### Public Booking

* Open booking link without authentication
* View available future dates
* Select available time slots
* Book a slot
* Automatically hide booked slots
* Prevent duplicate bookings

### Error Handling

* Invalid booking links display a 404 page
* User-friendly toast notifications
* Client-side and server-side validation
* 
---

## Installation

### Clone Repository

```bash
git clone https://github.com/jasmatp/scheduler-app.git
cd scheduler-app
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

---

### Availability

#### Create Availability

```http
POST /api/availability
```

Requires JWT token.

---

### Booking

#### Generate Booking Link

```http
POST /api/booking/generate-link
```

Requires JWT token.

#### Get Availability By Link

```http
GET /api/booking/:bookingLinkId
```

#### Book Slot

```http
POST /api/booking/book
```

---

## Validation

### Client Side

* Required fields
* Email format validation
* Password length validation
* Start time must be before end time

### Server Side

* Duplicate email validation
* Required field validation
* Duplicate booking prevention
* JWT authentication validation

---

## Performance Considerations

* Stateless JWT authentication
* Modular architecture
* Reusable React components
* MongoDB indexing support
* Efficient slot filtering for bookings
---
