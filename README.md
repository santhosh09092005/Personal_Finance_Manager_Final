# **Personal Finance Manager**

## **Overview**

The **Personal Finance Manager** is a web application designed to help users manage their finances effectively. It enables users to track their income, expenses, savings, investments, and financial goals, providing an organized platform for managing personal finances. The application uses the **MERN Stack** (MongoDB, Express.js, React, Node.js) to offer a seamless user experience with dynamic features, making it both scalable and efficient.

This project is divided into two main parts:

- **Client**: The frontend part of the application built using React.js.
- **Server**: The backend part using Node.js, Express.js, and MongoDB for data storage and handling API requests.

---

## **Features**

### 1. **User Authentication**
   - **Sign Up / Log In**: Secure user authentication system to manage personal accounts.
   - **JWT Authentication**: Utilizes JSON Web Tokens (JWT) for secure and session-based user authentication.

### 2. **Dashboard**
   - **Financial Overview**: A comprehensive dashboard displaying a summary of the user's finances, including balance, recent transactions, and savings.
   - **Charts & Graphs**: Visualization of financial data with the help of graphs and charts for better insights.

### 3. **Income & Expense Tracking**
   - **Add Transactions**: Allows users to add income and expense transactions, specifying details such as category, amount, and description.
   - **Edit / Delete Transactions**: Users can edit or remove transactions as needed to maintain accurate records.
   - **Transaction Categories**: Users can categorize transactions (e.g., groceries, rent, salary).

### 4. **Budgeting**
   - **Create and Manage Budgets**: Users can set budgets for various categories and monitor progress.
   - **Budget Alerts**: Notifications to alert users when they approach or exceed their budget limits.

### 5. **Financial Reports**
   - **Monthly and Yearly Reports**: Automatically generated reports to track income and expenses over time.
   - **Export Reports**: Option to export reports as PDFs for easy offline access.

### 6. **Data Storage**
   - **MongoDB**: Utilizes MongoDB to store data such as user profiles, transactions, and budgets.
   - **Backup and Restore**: Users can back up their data to prevent loss and restore data when necessary.

### 7. **Responsive Design**
   - Fully responsive layout, ensuring that the app is usable on both desktop and mobile devices.

---

## **Tech Stack**

### **Frontend:**
- **React.js**: For building dynamic user interfaces.
- **Redux**: For state management across the application.
- **Axios**: For making API requests to the backend.
- **Chart.js**: For data visualization and displaying financial data in charts.
- **Material UI**: For styling and pre-built UI components.

### **Backend:**
- **Node.js**: JavaScript runtime environment for server-side logic.
- **Express.js**: Web framework for building APIs and handling HTTP requests.
- **MongoDB**: NoSQL database for storing user data, transactions, and budgets.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB to define and manage data schemas.
- **JWT**: JSON Web Tokens for secure user authentication.

### **Development Tools:**
- **Postman**: For testing the backend API endpoints.
- **Nodemon**: For automatically restarting the server during development.
- **Bcrypt.js**: For securely hashing user passwords.
- **Cors**: For enabling cross-origin resource sharing (CORS) on the server.

---

## **Folder Structure**

### **Client (Frontend)**

- `client/`
  - `src/`
    - `components/` - React components for different parts of the UI (e.g., forms, dashboard).
    - `contexts/` - Global state management for the frontend (e.g., user authentication).
    - `services/` - API interaction functions.
    - `App.js` - Main component for the application.
    - `index.js` - Entry point to render the app in the DOM.

### **Server (Backend)**

- `server/`
  - `models/` - Mongoose models for defining data schemas (e.g., User, Transaction).
  - `routes/` - API routes for handling requests related to user data and transactions.
  - `controllers/` - Functions to handle the business logic for different API routes.
  - `middleware/` - Middleware functions for error handling, authentication, etc.
  - `config/` - Configuration files for database connection and JWT secret.
  - `server.js` - Main server entry point for setting up Express and API routes.

---
