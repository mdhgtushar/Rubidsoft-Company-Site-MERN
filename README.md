# Rubidsoft Company Site - MERN Stack

<div align="center">

![Rubidsoft Logo](https://via.placeholder.com/200x80/2563eb/ffffff?text=Rubidsoft)

# 🚀 Modern MERN Stack Company Website

**A comprehensive company website built with MongoDB, Express.js, React.js, and Node.js**

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.21+-black.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[🏠 Live Demo](https://your-domain.com) • [📚 Documentation](./docs/) • [🐛 Report Bug](https://github.com/your-username/rubidsoft-company-site/issues) • [💡 Request Feature](https://github.com/your-username/rubidsoft-company-site/issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 API Endpoints](#-api-endpoints)
- [👥 User Roles](#-user-roles)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Role-based access control** (User/Admin roles)
- **Password hashing** with bcrypt
- **Account lockout protection** after failed attempts
- **Session management** with automatic logout

### 👥 User Management
- **User registration and login** with validation
- **Profile management** with avatar support
- **Password change functionality**
- **Admin user management** with CRUD operations
- **User activity tracking**

### 🛡️ Security Features
- **Input validation and sanitization**
- **Rate limiting** to prevent abuse
- **CORS protection** with configurable origins
- **Security headers** with Helmet
- **SQL injection prevention**
- **XSS protection**

### 📱 Modern UI/UX
- **Responsive design** with Tailwind CSS
- **Role-based navigation** and interfaces
- **Modern component architecture**
- **Optimized performance** with React 18
- **Mobile-first approach**

### 🗄️ Database Features
- **MongoDB with Mongoose ODM**
- **Optimized queries** with proper indexing
- **Data validation** and integrity
- **Backup and recovery** strategies

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Icons** - Icon library

### Development Tools
- **Git** - Version control
- **npm** - Package management
- **nodemon** - Development server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rubidsoft-company-site.git
   cd rubidsoft-company-site
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../api && npm install
   ```

3. **Environment setup**
   ```bash
   # Backend environment
   cd api
   cp .env.example .env
   # Edit .env with your configuration
   
   # Frontend environment
   cd ../frontend
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Start API server
   cd api && npm run dev
   
   # Terminal 2 - Start frontend
   cd frontend && npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
rubidsoft-company-site/
├── 📁 api/                    # Express.js backend
│   ├── 📁 config/            # Configuration files
│   │   ├── app.config.js     # Main app configuration
│   │   └── cors.config.js    # CORS configuration
│   ├── 📁 features/          # Feature modules
│   │   └── 📁 user/          # User management
│   │       ├── user.controller.js
│   │       ├── user.model.js
│   │       └── user.routes.js
│   ├── 📁 middleware/        # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── errorHandler.js
│   ├── 📁 utils/             # Utility functions
│   │   ├── db.js
│   │   ├── generateToken.js
│   │   └── validateInput.js
│   ├── index.js              # Main server file
│   └── package.json
├── 📁 frontend/              # React.js frontend
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable components
│   │   ├── 📁 pages/         # Page components
│   │   │   ├── 📁 admin/     # Admin pages
│   │   │   └── 📁 user/      # User pages
│   │   ├── 📁 store/         # Redux store
│   │   ├── 📁 services/      # API services
│   │   ├── 📁 constants/     # Constants
│   │   ├── 📁 hooks/         # Custom hooks
│   │   └── 📁 utils/         # Utility functions
│   ├── public/               # Static assets
│   └── package.json
├── 📁 docs/                  # Documentation
│   ├── README.md             # Documentation homepage
│   ├── user_guide.md         # User guide
│   ├── developer_guide.md    # Developer guide
│   ├── api_documentation.md  # API documentation
│   ├── deployment.md         # Deployment guide
│   └── contributing.md       # Contributing guide
└── README.md                 # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Health Check
- `GET /api/health` - API health status

## 👥 User Roles

### User Role
- Access to personal dashboard
- Profile management
- View company information
- Basic site features

### Admin Role
- All user permissions
- User management (CRUD)
- System administration
- Analytics and reports
- Content management

## 📚 Documentation

<div align="center">

| [🏠 Home](./docs/README.md) | [👤 User Guide](./docs/user_guide.md) | [🛠️ Developer Guide](./docs/developer_guide.md) | [🔌 API Docs](./docs/api_documentation.md) | [🚀 Deployment](./docs/deployment.md) | [🤝 Contributing](./docs/contributing.md) |
|:---:|:---:|:---:|:---:|:---:|:---:|

</div>

### 📖 Documentation Overview
- **[User Guide](./docs/user_guide.md)** - Complete guide for end users
- **[Developer Guide](./docs/developer_guide.md)** - Technical documentation for developers
- **[API Documentation](./docs/api_documentation.md)** - Complete API reference
- **[Deployment Guide](./docs/deployment.md)** - Production deployment instructions
- **[Contributing Guide](./docs/contributing.md)** - Development standards and workflow

## 🚀 Deployment

### Frontend Deployment
- **Vercel** (Recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Manual deployment**

### Backend Deployment
- **DigitalOcean Droplet**
- **AWS EC2**
- **Heroku**
- **Docker containers**

### Database
- **MongoDB Atlas** (Recommended)
- **Self-hosted MongoDB**
- **AWS DocumentDB**

For detailed deployment instructions, see our [Deployment Guide](./docs/deployment.md).

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd api && npm test
```

### Test Coverage
- Unit tests for components and utilities
- Integration tests for API endpoints
- End-to-end tests for user workflows
- Minimum 80% code coverage requirement

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow established coding conventions
- Write comprehensive tests
- Update documentation
- Ensure security best practices

## 📊 Performance

### Frontend Optimization
- Code splitting and lazy loading
- Component memoization
- Bundle size optimization
- Image and asset optimization

### Backend Optimization
- Database query optimization
- Caching strategies
- API response optimization
- Connection pooling

## 🔒 Security

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting and CORS protection
- Security headers with Helmet
- Account lockout protection

### Security Best Practices
- HTTPS enforcement in production
- Secure environment variables
- Regular security updates
- Vulnerability scanning

## 📞 Support

### Getting Help
- **Documentation**: Check our [documentation](./docs/) first
- **Issues**: [GitHub Issues](https://github.com/your-username/rubidsoft-company-site/issues)
- **Email**: support@rubidsoft.com
- **Discussions**: [GitHub Discussions](https://github.com/your-username/rubidsoft-company-site/discussions)

### Community
- Join our community discussions
- Share your experience
- Help other users
- Report bugs and suggest features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React.js** team for the amazing framework
- **Express.js** team for the web framework
- **MongoDB** team for the database
- **Tailwind CSS** team for the styling framework
- **All contributors** who help improve this project

---

<div align="center">

**Built with ❤️ by the Rubidsoft Team**

[![GitHub stars](https://img.shields.io/github/stars/your-username/rubidsoft-company-site?style=social)](https://github.com/your-username/rubidsoft-company-site)
[![GitHub forks](https://img.shields.io/github/forks/your-username/rubidsoft-company-site?style=social)](https://github.com/your-username/rubidsoft-company-site)
[![GitHub issues](https://img.shields.io/github/issues/your-username/rubidsoft-company-site)](https://github.com/your-username/rubidsoft-company-site/issues)

*Last updated: June 2024*

</div> 