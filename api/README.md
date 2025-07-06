# Rubidsoft API

A comprehensive REST API for the Rubidsoft company website built with Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user CRUD operations with profile management
- **Project Portfolio**: Comprehensive project management with categories, features, and statistics
- **Services Management**: Service catalog with pricing tiers and detailed information
- **Order Management**: Complete order lifecycle from creation to completion
- **Blog System**: Full-featured blog with comments, categories, and SEO
- **Contact Management**: Inquiry handling with spam detection and response tracking
- **Task Management**: Project task assignment and tracking
- **File Upload**: Secure file upload with validation and organization
- **Email System**: Automated email notifications and templates

### Technical Features
- **Security**: Helmet, CORS, rate limiting, input validation
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with refresh mechanism
- **File Handling**: Multer with organized storage
- **Email**: Nodemailer with HTML templates
- **Validation**: Express-validator with custom rules
- **Error Handling**: Centralized error handling middleware
- **Logging**: Morgan HTTP request logger
- **Documentation**: Comprehensive API documentation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rubidsoft_db
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   EMAIL_FROM=noreply@rubidsoft.com
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   
   # File Upload
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📁 Project Structure

```
api/
├── config/                 # Configuration files
│   ├── app.config.js      # Main application configuration
│   └── cors.config.js     # CORS configuration
├── features/              # Feature modules
│   ├── user/             # User management
│   ├── project/          # Project portfolio
│   ├── service/          # Services management
│   ├── order/            # Order management
│   ├── blog/             # Blog system
│   ├── contact/          # Contact management
│   ├── task/             # Task management
│   └── routes.js         # Main routes file
├── middleware/           # Custom middleware
│   ├── auth.middleware.js # Authentication middleware
│   └── errorHandler.js   # Error handling middleware
├── utils/               # Utility functions
│   ├── db.js           # Database connection
│   ├── generateToken.js # JWT token generation
│   ├── validateInput.js # Input validation
│   ├── upload.js       # File upload utilities
│   └── emailService.js # Email service
├── uploads/            # File upload directory
├── index.js           # Main application file
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## 🔧 Configuration

### Database Configuration
The API uses MongoDB with Mongoose. Configure your database connection in `config/app.config.js`:

```javascript
database: {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rubidsoft_db',
  options: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
}
```

### Security Configuration
Security settings are configured in `config/app.config.js`:

```javascript
security: {
  bcryptRounds: 12,
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000 // 15 minutes
}
```

### Email Configuration
Email settings for notifications and automated emails:

```javascript
email: {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  from: process.env.EMAIL_FROM || 'noreply@rubidsoft.com'
}
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:slug` - Get project by slug
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/category/:category` - Get projects by category
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get service by slug
- `GET /api/services/featured` - Get featured services
- `GET /api/services/category/:category` - Get services by category
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/me` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id` - Update order (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get blog post by slug
- `GET /api/blog/featured` - Get featured blog posts
- `GET /api/blog/category/:category` - Get blog posts by category
- `POST /api/blog/:id/comments` - Add comment to blog post
- `POST /api/blog` - Create blog post (Admin)
- `PUT /api/blog/:id` - Update blog post (Admin)
- `DELETE /api/blog/:id` - Delete blog post (Admin)

### Contact
- `POST /api/contact` - Create contact/inquiry
- `GET /api/contact` - Get all contacts (Admin)
- `GET /api/contact/:id` - Get contact by ID (Admin)
- `PUT /api/contact/:id` - Update contact (Admin)
- `DELETE /api/contact/:id` - Delete contact (Admin)

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **user**: Regular user with limited access
- **admin**: Administrator with full access

## 📊 Database Models

### User Model
- Basic user information (name, email, password)
- Role-based access control
- Account security features (login attempts, lockout)
- Email verification and password reset

### Project Model
- Project details and descriptions
- Client information
- Technology stack and features
- Images and media
- Statistics and ratings

### Service Model
- Service information and pricing
- Feature lists and benefits
- Process steps and technologies
- Testimonials and FAQs

### Order Model
- Customer information
- Service and package details
- Requirements and specifications
- Payment and communication tracking

### Blog Model
- Blog post content and metadata
- Categories and tags
- Comments and moderation
- SEO optimization

### Contact Model
- Inquiry details and customer info
- Service preferences
- Spam detection
- Response tracking

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with configurable rounds
- **Rate Limiting**: Prevent abuse with request limits
- **Input Validation**: Comprehensive input sanitization
- **CORS Protection**: Cross-origin resource sharing control
- **Helmet Security**: HTTP headers security
- **Account Lockout**: Brute force protection
- **Spam Detection**: Contact form spam filtering

## 📧 Email System

The API includes a comprehensive email system with:

- **Welcome Emails**: New user registration
- **Password Reset**: Secure password recovery
- **Order Confirmations**: Order status updates
- **Contact Notifications**: Inquiry alerts
- **Task Assignments**: Team collaboration
- **Blog Comments**: Content moderation

## 📁 File Upload

Secure file upload system with:

- **Multiple File Types**: Images, documents, archives
- **Size Validation**: Configurable file size limits
- **Organized Storage**: Automatic directory organization
- **Security Checks**: File type validation
- **Cleanup Utilities**: File management functions

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your-production-mongodb-uri
   JWT_SECRET=your-production-jwt-secret
   EMAIL_HOST=your-smtp-host
   EMAIL_USER=your-email
   EMAIL_PASS=your-email-password
   CORS_ORIGIN=your-frontend-url
   ```

2. **Build and Start**
   ```bash
   npm install --production
   npm start
   ```

3. **Process Management**
   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start index.js --name "rubidsoft-api"
   pm2 startup
   pm2 save
   ```

### Docker Deployment

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## 📈 Monitoring

### Health Monitoring
- Database connection status
- Email service availability
- File system access
- Memory and CPU usage

### Logging
- HTTP request logging with Morgan
- Error logging with stack traces
- Database query logging
- Email delivery logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: support@rubidsoft.com
- **Documentation**: [API Documentation](./API_DOCUMENTATION.md)
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Complete CRUD operations for all entities
- Authentication and authorization
- File upload system
- Email notifications
- Comprehensive API documentation

---

**Built with ❤️ by the Rubidsoft Team** 