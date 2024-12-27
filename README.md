# Notes App

## Watch live preview- https://collegedunia-assignment-beta.vercel.app/

A full-stack notes application built with React, Node.js, and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Manujdixit/collegedunia_assignment.git
cd collegedunia_assignment
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm run dev
```

The server will run on http://localhost:4000

### 3. Frontend Setup

Open a new terminal, navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

Start the development server:

```bash
npm run dev
```

The client will run on http://localhost:5173

## Features

- User authentication (register/login)
- Create, read, update, and delete notes
- Categorize notes
- Search notes
- Dark/Light theme
- Responsive design
- Polling notes after every 10 seconds

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT

## Environment Variables

### Backend (.env)

- `PORT`: Server port (default: 4000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

### Frontend (.env)

- `VITE_API_URL`: Backend API URL
