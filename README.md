# React and Express App with JWT Authentication
This project is a web application built with React and Express, featuring JSON Web Token (JWT) authentication. Follow the steps below to get the application up and running on your local machine.

## Prerequisites
Ensure you have the following installed on your machine:

Node.js
npm
MySQL

## Getting Started

### 1. Clone the Repository

git clone <repository-url>
cd <repository-directory>

### 2. Set Up the Backend
Navigate to the backend directory:

cd backend
Install the required dependencies:

npm install
Create a .env file in the backend directory with the following variables:

env
Copy code
MYSQL_HOST=your_mysql_host
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=your_mysql_database
JWT_SECRET=your_jwt_secret
MYSQL_PORT=your_mysql_port
NODE_ENV=your_node_env
SESSION_SECRET=your_session_secret

### 3. Set Up the Frontend

Navigate to the frontend directory:
cd ../frontend

Install the required dependencies:
npm install

### Running the Application

Backend
Navigate to the backend directory and start the server:
cd backend
npm start

Frontend
Navigate to the frontend directory and start the development server:

cd frontend
npm start

### Environment Variables
Ensure that your .env file in the backend directory contains the following variables with your specific configuration:

MYSQL_HOST: The host address of your MySQL database.
MYSQL_USER: The username for accessing your MySQL database.
MYSQL_PASSWORD: The password for accessing your MySQL database.
MYSQL_DATABASE: The name of your MySQL database.
JWT_SECRET: A secret key for signing JWT tokens.
MYSQL_PORT: The port number for your MySQL database (default is usually 3306).
NODE_ENV: The environment in which your application is running (e.g., development or production).
SESSION_SECRET: A secret key for session management.


Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements.

License
This project is licensed under the MIT License. See the LICENSE file for details.

