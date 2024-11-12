# uprio

## backend

## Task Management API

backend url = [text](https://uprio-hb32.onrender.com)


This is a backend API for a task management system built with Express.js and MongoDB. The application allows user registration, login, and CRUD operations on tasks.

## Features
User Registration and Login with JWT Authentication
CRUD operations for tasks with role-based access
MongoDB as the database
RESTful endpoints for tasks and user management

## Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT for authentication
bcrypt for password hashing
Getting Started

## Running the Application
npm run server

## API Endpoints

## User Authentication
Register
POST /auth/register


## Login
POST /auth/login


## Task Management
Add a Task
POST /task/addTask


## Get All Tasks
GET /task/allTask


## Update a Task
PUT /task/updateTask/:id


## Delete a Task
DELETE /task/deleteTask/:id




## frontend


# Todo Application

This is a simple Todo application built with React. The application allows users to manage tasks by adding new ones, updating them, deleting, filtering, and sorting tasks based on certain parameters.

## Features
Add Task**: Allows users to add a new task with title, description, due date, priority, and completion status.
Update Task: Users can update the task status (mark as complete) and other details.
Delete Task: Tasks can be deleted from the list.
Filter Tasks: Filter tasks by status (all, pending, completed).
Sort Tasks: Sort tasks by priority, due date, or completion status.

## Tech Stack
Frontend: React, Axios, Chakra UI
Backend: Node.js, Express (for handling API requests)
Authentication: JWT (JSON Web Tokens) for user authentication


