# Rubidsoft API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow this format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {},
  "error": "Error message (if any)"
}
```

---

## Authentication Endpoints

### Register User
- **POST** `/auth/register`
- **Access**: Public
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

### Login User
- **POST** `/auth/login`
- **Access**: Public
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout User
- **POST** `/auth/logout`
- **Access**: Private

### Forgot Password
- **POST** `/auth/forgot-password`
- **Access**: Public
- **Body**:
```json
{
  "email": "john@example.com"
}
```

### Reset Password
- **POST** `/auth/reset-password`
- **Access**: Public
- **Body**:
```json
{
  "token": "reset-token",
  "password": "newpassword123"
}
```

---

## User Endpoints

### Get User Profile
- **GET** `/users/profile`
- **Access**: Private

### Update User Profile
- **PUT** `/users/profile`
- **Access**: Private
- **Body**:
```json
{
  "name": "John Doe",
  "phone": "+1234567890"
}
```

### Change Password
- **PUT** `/users/change-password`
- **Access**: Private
- **Body**:
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Get All Users (Admin)
- **GET** `/users`
- **Access**: Admin
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Search term
  - `role`: Filter by role

### Get User by ID (Admin)
- **GET** `/users/:id`
- **Access**: Admin

### Update User (Admin)
- **PUT** `/users/:id`
- **Access**: Admin
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "isActive": true
}
```

### Delete User (Admin)
- **DELETE** `/users/:id`
- **Access**: Admin

---

## Project Endpoints

### Get All Projects
- **GET** `/projects`
- **Access**: Public
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `category`: Filter by category
  - `featured`: Filter featured projects (true/false)
  - `published`: Filter published projects (true/false)
  - `search`: Search term
  - `sort`: Sort field (default: -createdAt)

### Get Project by Slug
- **GET** `/projects/:slug`
- **Access**: Public

### Get Featured Projects
- **GET** `/projects/featured`
- **Access**: Public
- **Query Parameters**:
  - `limit`: Number of projects (default: 6)

### Get Projects by Category
- **GET** `/projects/category/:category`
- **Access**: Public
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)

### Create Project (Admin)
- **POST** `/projects`
- **Access**: Admin
- **Body**:
```json
{
  "title": "Project Title",
  "description": "Short description",
  "fullDescription": "Full project description",
  "category": "web-development",
  "technologies": ["React", "Node.js"],
  "client": {
    "name": "Client Name",
    "industry": "Technology",
    "website": "https://client.com"
  },
  "projectDetails": {
    "duration": "3 months",
    "teamSize": 5,
    "budget": "large",
    "status": "completed"
  },
  "images": {
    "thumbnail": "thumbnail-url",
    "gallery": ["image1-url", "image2-url"]
  },
  "features": [
    {
      "title": "Feature 1",
      "description": "Feature description",
      "icon": "icon-name"
    }
  ],
  "isFeatured": false,
  "isPublished": true
}
```

### Update Project (Admin)
- **PUT** `/projects/:id`
- **Access**: Admin

### Delete Project (Admin)
- **DELETE** `/projects/:id`
- **Access**: Admin

### Toggle Featured Status (Admin)
- **PATCH** `/projects/:id/toggle-featured`
- **Access**: Admin

### Toggle Published Status (Admin)
- **PATCH** `/projects/:id/toggle-published`
- **Access**: Admin

### Get Project Statistics (Admin)
- **GET** `/projects/stats/overview`
- **Access**: Admin

---

## Service Endpoints

### Get All Services
- **GET** `/services`
- **Access**: Public
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `category`: Filter by category
  - `featured`: Filter featured services (true/false)
  - `active`: Filter active services (true/false)
  - `search`: Search term
  - `sort`: Sort field (default: order)

### Get Service by Slug
- **GET** `/services/:slug`
- **Access**: Public

### Get Featured Services
- **GET** `/services/featured`
- **Access**: Public
- **Query Parameters**:
  - `limit`: Number of services (default: 6)

### Get Services by Category
- **GET** `/services/category/:category`
- **Access**: Public
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)

### Create Service (Admin)
- **POST** `/services`
- **Access**: Admin
- **Body**:
```json
{
  "title": "Service Title",
  "shortDescription": "Short description",
  "description": "Full service description",
  "category": "web-development",
  "icon": "service-icon",
  "image": "service-image-url",
  "features": [
    {
      "title": "Feature 1",
      "description": "Feature description",
      "icon": "feature-icon"
    }
  ],
  "pricing": {
    "basic": {
      "name": "Basic",
      "price": 999,
      "features": ["Feature 1", "Feature 2"]
    },
    "professional": {
      "name": "Professional",
      "price": 1999,
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "popular": true
    }
  },
  "isActive": true,
  "isFeatured": false,
  "order": 1
}
```

### Update Service (Admin)
- **PUT** `/services/:id`
- **Access**: Admin

### Delete Service (Admin)
- **DELETE** `/services/:id`
- **Access**: Admin

### Toggle Active Status (Admin)
- **PATCH** `/services/:id/toggle-active`
- **Access**: Admin

### Toggle Featured Status (Admin)
- **PATCH** `/services/:id/toggle-featured`
- **Access**: Admin

### Update Service Order (Admin)
- **PATCH** `/services/:id/order`
- **Access**: Admin
- **Body**:
```json
{
  "order": 2
}
```

### Get Service Statistics (Admin)
- **GET** `/services/stats/overview`
- **Access**: Admin

---

## Order Endpoints

### Create Order
- **POST** `/orders`
- **Access**: Public
- **Body**:
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Company Name",
    "website": "https://company.com"
  },
  "service": "service-id",
  "package": "professional",
  "requirements": {
    "description": "Project requirements",
    "features": ["Feature 1", "Feature 2"],
    "technologies": ["React", "Node.js"],
    "timeline": "3 months",
    "budget": "large"
  },
  "pricing": {
    "basePrice": 1999,
    "totalPrice": 1999,
    "currency": "USD"
  },
  "communication": {
    "preferredMethod": "email",
    "timezone": "UTC-5"
  }
}
```

### Get User Orders
- **GET** `/orders/user/me`
- **Access**: Private
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status

### Get Order by ID
- **GET** `/orders/:id`
- **Access**: Private (Owner or Admin)

### Get All Orders (Admin)
- **GET** `/orders`
- **Access**: Admin
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status
  - `priority`: Filter by priority
  - `assignedTo`: Filter by assigned user
  - `search`: Search term
  - `sort`: Sort field (default: -createdAt)

### Update Order (Admin)
- **PUT** `/orders/:id`
- **Access**: Admin

### Delete Order (Admin)
- **DELETE** `/orders/:id`
- **Access**: Admin

### Update Order Status (Admin)
- **PATCH** `/orders/:id/status`
- **Access**: Admin
- **Body**:
```json
{
  "status": "in-progress"
}
```

### Assign Order (Admin)
- **PATCH** `/orders/:id/assign`
- **Access**: Admin
- **Body**:
```json
{
  "assignedTo": "user-id"
}
```

### Add Message to Order
- **POST** `/orders/:id/messages`
- **Access**: Private (Owner or Admin)
- **Body**:
```json
{
  "message": "Message content"
}
```

### Get Order Statistics (Admin)
- **GET** `/orders/stats/overview`
- **Access**: Admin

---

## Blog Endpoints

### Get All Blog Posts
- **GET** `/blog`
- **Access**: Public
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `category`: Filter by category
  - `featured`: Filter featured posts (true/false)
  - `published`: Filter published posts (true/false)
  - `search`: Search term
  - `sort`: Sort field (default: -publishedAt)

### Get Blog Post by Slug
- **GET** `/blog/:slug`
- **Access**: Public

### Get Featured Blog Posts
- **GET** `/blog/featured`
- **Access**: Public
- **Query Parameters**:
  - `limit`: Number of posts (default: 6)

### Get Blog Posts by Category
- **GET** `/blog/category/:category`
- **Access**: Public
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)

### Add Comment to Blog Post
- **POST** `/blog/:id/comments`
- **Access**: Public
- **Body**:
```json
{
  "name": "Commenter Name",
  "email": "commenter@example.com",
  "comment": "Comment content"
}
```

### Create Blog Post (Admin)
- **POST** `/blog`
- **Access**: Admin
- **Body**:
```json
{
  "title": "Blog Post Title",
  "excerpt": "Short excerpt",
  "content": "Full blog content",
  "featuredImage": "image-url",
  "category": "web-development",
  "tags": ["tag1", "tag2"],
  "status": "draft",
  "isFeatured": false,
  "isPublished": false,
  "seo": {
    "metaTitle": "SEO Title",
    "metaDescription": "SEO Description",
    "keywords": ["keyword1", "keyword2"]
  }
}
```

### Update Blog Post (Admin)
- **PUT** `/blog/:id`
- **Access**: Admin

### Delete Blog Post (Admin)
- **DELETE** `/blog/:id`
- **Access**: Admin

### Toggle Featured Status (Admin)
- **PATCH** `/blog/:id/toggle-featured`
- **Access**: Admin

### Toggle Publish Status (Admin)
- **PATCH** `/blog/:id/publish`
- **Access**: Admin

### Update Comment Status (Admin)
- **PATCH** `/blog/:id/comments/:commentId`
- **Access**: Admin
- **Body**:
```json
{
  "isApproved": true
}
```

### Get Blog Statistics (Admin)
- **GET** `/blog/stats/overview`
- **Access**: Admin

---

## Contact Endpoints

### Create Contact/Inquiry
- **POST** `/contact`
- **Access**: Public
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Company Name",
  "website": "https://company.com",
  "subject": "Inquiry Subject",
  "message": "Inquiry message",
  "service": "service-id",
  "budget": "large",
  "timeline": "1-2-months",
  "source": "website"
}
```

### Get All Contacts (Admin)
- **GET** `/contact`
- **Access**: Admin
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status
  - `priority`: Filter by priority
  - `assignedTo`: Filter by assigned user
  - `source`: Filter by source
  - `search`: Search term
  - `sort`: Sort field (default: -createdAt)

### Get Contact by ID (Admin)
- **GET** `/contact/:id`
- **Access**: Admin

### Update Contact (Admin)
- **PUT** `/contact/:id`
- **Access**: Admin

### Delete Contact (Admin)
- **DELETE** `/contact/:id`
- **Access**: Admin

### Update Contact Status (Admin)
- **PATCH** `/contact/:id/status`
- **Access**: Admin
- **Body**:
```json
{
  "status": "in-progress"
}
```

### Assign Contact (Admin)
- **PATCH** `/contact/:id/assign`
- **Access**: Admin
- **Body**:
```json
{
  "assignedTo": "user-id"
}
```

### Add Note to Contact (Admin)
- **POST** `/contact/:id/notes`
- **Access**: Admin
- **Body**:
```json
{
  "note": "Note content"
}
```

### Add Response to Contact (Admin)
- **POST** `/contact/:id/responses`
- **Access**: Admin
- **Body**:
```json
{
  "message": "Response message",
  "method": "email"
}
```

### Toggle Spam Status (Admin)
- **PATCH** `/contact/:id/spam`
- **Access**: Admin
- **Body**:
```json
{
  "isSpam": true
}
```

### Get Contact Statistics (Admin)
- **GET** `/contact/stats/overview`
- **Access**: Admin

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 423 | Locked (Account locked) |
| 500 | Internal Server Error |

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: Rate limit information is included in response headers

---

## File Upload

### Supported File Types
- Images: JPEG, PNG, GIF
- Documents: PDF, DOC, DOCX, XLS, XLSX, TXT
- Archives: ZIP, RAR

### File Size Limits
- Images: 5MB
- Documents: 10MB
- General: 5MB

### Upload Endpoints
- **POST** `/upload/image` - Single image upload
- **POST** `/upload/documents` - Multiple document upload
- **POST** `/upload/general` - General file upload

---

## Webhooks

### Available Webhooks
- Order created
- Order status updated
- Contact form submitted
- Blog comment added

### Webhook Format
```json
{
  "event": "order.created",
  "timestamp": "2024-01-01T00:00:00Z",
  "data": {}
}
```

---

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rubidsoft_db
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
EMAIL_FROM=noreply@rubidsoft.com
CORS_ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

---

## Testing

### Health Check
- **GET** `/api/health`

### Test Endpoints
- **GET** `/api/test/auth` - Test authentication
- **GET** `/api/test/db` - Test database connection
- **GET** `/api/test/email` - Test email configuration

---

## Support

For API support and questions, please contact:
- Email: support@rubidsoft.com
- Documentation: https://docs.rubidsoft.com/api
- GitHub: https://github.com/rubidsoft/api 