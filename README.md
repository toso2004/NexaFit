# NexaFit Backend API

A scalable RESTful backend API for the NexaFit fitness management platform built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**.

The project demonstrates modern backend development practices including authentication, role-based authorization, database transactions, reusable utilities, and a layered architecture.

---

## 🚀 Features

### Authentication

* User registration
* Secure login
* JWT access tokens
* Refresh tokens
* Email verification
* Password reset
* Token revocation

### Authorization

* Role-based access control
* Protected routes
* Multiple authorization levels
* Middleware-based authentication

### User Management

* Create users
* Update users
* Retrieve users
* Soft delete users
* Employee management

### Database

* PostgreSQL
* Database transactions
* Parameterized SQL queries
* Connection pooling

### Developer Experience

* TypeScript
* Layered architecture
* Reusable utilities
* Centralized error handling
* Custom HTTP response helpers
* Request logging
* Environment configuration

---

## 🏗 Architecture

```text
src/
│
├── controllers/
├── services/
├── middleware/
├── routes/
├── models/
│   ├── enums/
│   ├── interfaces/
│   └── types/
├── utils/
└── app.ts
```

The project follows a layered architecture where each layer has a single responsibility:

* **Routes** define API endpoints.
* **Controllers** process HTTP requests and responses.
* **Services** contain business logic.
* **Middleware** handles authentication and authorization.
* **Utilities** provide reusable functionality such as logging, database access, email handling, token generation, and standardized HTTP responses.

---

## 🛠 Tech Stack

### Language

* TypeScript

### Runtime

* Node.js

### Framework

* Express.js

### Database

* PostgreSQL

### Authentication

* JSON Web Tokens (JWT)
* bcrypt

### Email

* Nodemailer

### Other Tools

* dotenv
* cors
* pg

---

## 🔒 Security Features

* Password hashing with bcrypt
* JWT authentication
* Refresh token management
* Role-based authorization
* Email verification
* Password reset workflow
* Environment variables for secrets
* Parameterized SQL queries

---

## 📌 API Modules

* Authentication
* User Management
* Employee Management
* Authorization
* Email Verification
* Password Reset

---

## 📚 What I Learned

This project strengthened my understanding of:

* Building scalable REST APIs
* TypeScript for backend development
* PostgreSQL transactions
* JWT authentication
* Role-based authorization
* Database design
* Error handling
* Clean project architecture
* Secure authentication workflows

---

## 🚧 Future Improvements

* Swagger/OpenAPI documentation
* Automated testing
* Docker support
* Membership management
* Payment integration
* Rate limiting
* Request validation
* CI/CD pipeline

---

## 👨‍💻 Author

**Thuso**

GitHub: https://github.com/toso2004
