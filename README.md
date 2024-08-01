# Inventory Management System

This is an Inventory Management System built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This system allows you to manage inventory items, track stock levels, and perform CRUD operations.

## Features

- **Add, Edit, Delete, and View Inventory Items**
- **Real-time Stock Level Updates**
- **User Authentication and Authorization**
- **Responsive Design**

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- MongoDB

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/inventory-management-system.git
    cd inventory-management-system
    ```

2. **Install dependencies:**

    **For the backend:**
    ```sh
    cd InventoryManagement-Team-01\04_BACKEND>
    npm install
    ```

    **For the frontend:**
    ```sh
    cd InventoryManagement-Team-01\03_FRONTEND>
    npm install
    ```

## Running the Application

1. **Start the MongoDB server:**
    Make sure your MongoDB server is running. You can start it using the following command (if installed locally):
    ```sh
    mongod
    ```

2. **Start the backend server:**
    Open a terminal, navigate to the `backend` directory, and run:
    ```sh
    cd InventoryManagement-Team-01\04_BACKEND>
    nodemon index.js
    ```

3. **Start the frontend server:**
    Open another terminal, navigate to the `frontend` directory, and run:
    ```sh
    cd InventoryManagement-Team-01\03_FRONTEND>
    npm run start
    ```

4. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```plaintext
inventory-management-system/
│
├── backend/                 # Backend code (Node.js + Express.js)
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   ├── controllers/         # Route controllers
│   ├── config/              # Configuration files (e.g., database connection)
│   ├── index.js             # Entry point for the backend server
│   └── package.json         # Backend dependencies and scripts
│
├── frontend/                # Frontend code (React.js)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # React pages
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # Entry point for the frontend
│   └── package.json         # Frontend dependencies and scripts
│
└── README.md                # This readme file

## Configuration

1. **Backend Configuration:**
    Create a `.env` file in the `backend` directory and add your MongoDB connection string and other environment variables:
    ```env
    MONGO_URI=mongodb://localhost:27017/inventory
    JWT_SECRET=your_jwt_secret
    ```

2. **Frontend Configuration:**
    Update the API endpoint in the frontend configuration file if necessary.

## Technologies Used

- **MongoDB**: NoSQL database for storing inventory data
- **Express.js**: Web framework for Node.js
- **React.js**: Frontend library for building user interfaces
- **Node.js**: JavaScript runtime for building the backend

## License

