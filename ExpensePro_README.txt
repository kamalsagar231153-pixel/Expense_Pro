ExpensePro – MERN Stack Expense Management System

Project Overview

ExpensePro is a full-stack expense management web application built
using the MERN stack (MongoDB, Express.js, React.js, Node.js). The
application helps users track their income, manage expenses, set monthly
budgets, and analyze spending patterns through a modern dashboard
interface.

The system implements secure authentication using JWT Access and Refresh
Tokens to protect user sessions and API requests.

Features

User Authentication

-   User registration and login
-   JWT Access Token authentication
-   Refresh Token mechanism
-   Token expiration handling
-   Secure protected routes

Expense Tracking

-   Add expenses
-   Edit expenses
-   Delete expenses
-   Category-based expense tracking

Income Management

-   Record monthly income
-   Track income history
-   Calculate total balance

Budget Management

-   Set monthly budget
-   Track budget usage
-   Monitor remaining balance
-   Spending alerts when limits are exceeded

Dashboard Analytics

-   Total balance overview
-   Monthly spending statistics
-   Budget usage percentage
-   Category distribution charts
-   Monthly spending trend visualization

Technology Stack

Frontend - React.js - JavaScript - Tailwind CSS - Axios

Backend - Node.js - Express.js

Database - MongoDB

Authentication - JWT (JSON Web Token) - Access Token - Refresh Token

Security Features

ExpensePro includes several security mechanisms:

-   JWT authentication
-   Access token expiration
-   Refresh token system
-   Rate limiting to prevent abuse
-   Secure environment variables

Important environment variables:

ACCESS_TOKEN_EXPIRE REFRESH_TOKEN_EXPIRE JWT_SECRET MONGO_URI

Project Structure

ExpensePro │ ├── client │ ├── src │ ├── components │ ├── pages │ └──
services │ ├── server │ ├── controllers │ ├── models │ ├── routes │ ├──
middleware │ └── config │ ├── screenshots │ └── README.txt

Installation and Setup

1.  Extract the project ZIP file.
2.  Open terminal in the server folder.

Install backend dependencies:

npm install

Start backend server:

npm start

3.  Navigate to client folder and install dependencies:

npm install

Run frontend application:

npm run dev

Environment Variables

Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRE=15m REFRESH_TOKEN_EXPIRE=7d PORT=5000

System Workflow

1.  User registers an account.
2.  User logs into the system.
3.  Server generates JWT access and refresh tokens.
4.  User accesses the dashboard.
5.  User records income and expenses.
6.  System calculates balance and budget usage.
7.  Dashboard displays financial insights.

Author

Kamal Sagar BCA (2023–2026) Kanpur Institute of Technology Location:
Kanpur, Uttar Pradesh
