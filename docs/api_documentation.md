# API Documentation - Rubidsoft Company Site

<div align="center">

# 📚 Documentation Navigation

| [🏠 Home](./README.md) | [👤 User Guide](./user_guide.md) | [🛠️ Developer Guide](./developer_guide.md) | [🔌 API Docs](./api_documentation.md) | [🤝 Contributing](./contributing.md) |
|:---:|:---:|:---:|:---:|:---:|

</div>

---

Comprehensive API reference for the Rubidsoft Company Site backend services.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [User Management](#user-management)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Security](#security)

## 🌐 Overview

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.your-domain.com/api`

### Content Type
All requests and responses use `application/json` content type.

### Authentication
Most endpoints require JWT token authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🔐 Authentication

### User Registration
**Endpoint**: `POST /auth/register`

**Description**: Register a new user account with the system.

**Request Body**:
- `name` (string, required): User's full name
- `email` (string, required): Valid email address
- `password` (string, required): Strong password
- `role` (string, optional): User role (default: "user")

**Response**: User object with authentication token

**Status Codes**:
- `201`: User created successfully
- `400`: Validation error or user already exists
- `500`: Server error

### User Login
**Endpoint**: `POST /auth/login`

**Description**: Authenticate user and receive access token.

**Request Body**:
- `email` (string, required): User's email address
- `password` (string, required): User's password

**Response**: User object with authentication token

**Status Codes**:
- `200`: Login successful
- `401`: Invalid credentials
- `423`: Account locked
- `500`: Server error

### User Logout
**Endpoint**: `POST /auth/logout`

**Description**: Logout user and invalidate session.

**Authentication**: Required

**Response**: Success message

**Status Codes**:
- `200`: Logout successful
- `401`: Unauthorized
- `500`: Server error

## 👥 User Management

### Get User Profile
**Endpoint**: `GET /users/profile`

**Description**: Retrieve current user's profile information.

**Authentication**: Required

**Response**: Complete user profile object

**Status Codes**:
- `200`: Profile retrieved successfully
- `401`: Unauthorized
- `500`: Server error

### Update User Profile
**Endpoint**: `PUT /users/profile`

**Description**: Update current user's profile information.

**Authentication**: Required

**Request Body**:
- `name` (string, optional): Updated name
- `phone` (string, optional): Updated phone number

**Response**: Updated user profile object

**Status Codes**:
- `200`: Profile updated successfully
- `400`: Validation error
- `401`: Unauthorized
- `500`: Server error

### Change Password
**Endpoint**: `PUT /users/change-password`

**Description**: Change user's password.

**Authentication**: Required

**Request Body**:
- `currentPassword` (string, required): Current password
- `newPassword` (string, required): New password
- `confirmPassword` (string, required): Password confirmation

**Response**: Success message

**Status Codes**:
- `200`: Password changed successfully
- `400`: Validation error or incorrect current password
- `401`: Unauthorized
- `500`: Server error

### Get All Users (Admin Only)
**Endpoint**: `GET /users`

**Description**: Retrieve list of all users with pagination.

**Authentication**: Required (Admin role)

**Query Parameters**:
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)

**Response**: Paginated list of users

**Status Codes**:
- `200`: Users retrieved successfully
- `401`: Unauthorized
- `403`: Forbidden (Admin role required)
- `500`: Server error

### Get User by ID (Admin Only)
**Endpoint**: `GET /users/:id`

**Description**: Retrieve specific user by ID.

**Authentication**: Required (Admin role)

**Path Parameters**:
- `id` (string, required): User ID

**Response**: User object

**Status Codes**:
- `200`: User retrieved successfully
- `401`: Unauthorized
- `403`: Forbidden (Admin role required)
- `404`: User not found
- `500`: Server error

### Update User (Admin Only)
**Endpoint**: `PUT /users/:id`

**Description**: Update specific user's information.

**Authentication**: Required (Admin role)

**Path Parameters**:
- `id` (string, required): User ID

**Request Body**:
- `name` (string, optional): Updated name
- `email` (string, optional): Updated email
- `role` (string, optional): Updated role
- `isActive` (boolean, optional): Account status

**Response**: Updated user object

**Status Codes**:
- `200`: User updated successfully
- `400`: Validation error
- `401`: Unauthorized
- `403`: Forbidden (Admin role required)
- `404`: User not found
- `500`: Server error

### Delete User (Admin Only)
**Endpoint**: `DELETE /users/:id`

**Description**: Delete specific user from the system.

**Authentication**: Required (Admin role)

**Path Parameters**:
- `id` (string, required): User ID

**Response**: Success message

**Status Codes**:
- `200`: User deleted successfully
- `401`: Unauthorized
- `403`: Forbidden (Admin role required)
- `404`: User not found
- `500`: Server error

## 📄 Response Format

### Success Response
All successful API responses follow this format:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Paginated Response
For endpoints that return paginated data:
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  },
  "data": [
    // Array of items
  ]
}
```

### Error Response
All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

## ❌ Error Handling

### HTTP Status Codes
- `200`: OK - Request successful
- `201`: Created - Resource created successfully
- `400`: Bad Request - Invalid input or validation error
- `401`: Unauthorized - Authentication required or failed
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `423`: Locked - Account temporarily locked
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server error

### Common Error Messages
- **"Invalid credentials"**: Email or password is incorrect
- **"User already exists"**: Email address is already registered
- **"Account is locked"**: Too many failed login attempts
- **"Not authorized"**: JWT token is missing or invalid
- **"Forbidden"**: User doesn't have required permissions
- **"Validation failed"**: Input data doesn't meet requirements
- **"Resource not found"**: Requested resource doesn't exist

### Validation Errors
When input validation fails, the response includes detailed error information:
- Field-specific error messages
- Validation rule descriptions
- Suggested corrections

## ⏱️ Rate Limiting

### Limits
- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 failed attempts before account lockout
- **Account Lockout**: 15 minutes duration

### Rate Limit Headers
Response headers include rate limit information:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets

### Rate Limit Exceeded
When rate limit is exceeded:
- HTTP status code: `429`
- Response includes retry-after information
- Account lockout for authentication endpoints

## 🛡️ Security

### Authentication
- JWT tokens with configurable expiration
- Secure token storage and transmission
- Automatic token refresh mechanism
- Session management and cleanup

### Authorization
- Role-based access control (User/Admin)
- Route-level protection
- Resource-level permissions
- Admin-only endpoints

### Input Security
- Comprehensive input validation
- SQL injection prevention
- XSS protection
- CSRF protection

### API Security
- HTTPS enforcement in production
- Security headers with Helmet
- CORS configuration
- Request size limiting

### Password Security
- bcrypt hashing with salt rounds
- Password strength requirements
- Account lockout protection
- Secure password reset process

## 📊 Health Check

### API Status
**Endpoint**: `GET /health`

**Description**: Check API health and status.

**Response**: API status information

**Status Codes**:
- `200`: API is healthy and running
- `500`: API is experiencing issues

### Health Check Response
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-06-29T12:00:00.000Z",
  "environment": "development"
}
```

## 🔧 Development

### Testing Endpoints
- Use Postman or similar tools for API testing
- Include proper authentication headers
- Test both success and error scenarios
- Verify response formats and status codes

### Environment Variables
- Configure database connection strings
- Set JWT secret keys
- Configure CORS origins
- Set environment-specific settings

### Logging
- Comprehensive request/response logging
- Error tracking and monitoring
- Performance metrics collection
- Security event logging

---

## 📞 Support

For API support and questions:
- **Email**: api-support@rubidsoft.com
- **Documentation**: Check this guide first
- **Issues**: Report via GitHub issues
- **Status**: Check health endpoint

---

*Last updated: June 2024* 