# Zerodha Clone

A full-stack stock trading platform clone with a marketing landing page, trading dashboard, and Express/MongoDB backend.

## Project Structure

```
zerodha/
├── backend/       Express.js API server (port 3002)
├── dashboard/     React trading dashboard (port 3001)
├── frontend/      React marketing landing page (port 3000)
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd backend
cp .env.example .env   # Add your MongoDB connection string
npm install
npm start
```

### 2. Dashboard

```bash
cd dashboard
npm install
npm start
```

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /allHoldings | Fetch all holdings |
| GET | /allPositions | Fetch all positions |
| POST | /newOrder | Create a new order |

## Tech Stack

- **Frontend:** React 18, React Router v6, Bootstrap 5, Material UI 5
- **Dashboard:** React 18, Chart.js, Axios, MUI, Emotion
- **Backend:** Node.js, Express 4, Mongoose, MongoDB
