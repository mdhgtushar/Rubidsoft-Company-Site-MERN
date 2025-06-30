# Rubidsoft Company Site - MERN Stack

<div align="center">

# 📚 Documentation Navigation

| [🏠 Home](./README.md) | [👤 User Guide](./user_guide.md) | [🛠️ Developer Guide](./developer_guide.md) | [🔌 API Docs](./api_documentation.md) | [🚀 Deployment](./deployment.md) | [🤝 Contributing](./contributing.md) |
|:---:|:---:|:---:|:---:|:---:|:---:|

</div>

---

Welcome to the official documentation for the Rubidsoft Company Site, a modern web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## 🚀 Quick Start

Get up and running in minutes with our comprehensive setup guide.

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/rubidsoft-company-site.git
cd rubidsoft-company-site

# Install dependencies for both frontend and API
cd frontend && npm install
cd ../api && npm install

# Start the development servers
# Terminal 1 - Start API server
cd api && npm run dev

# Terminal 2 - Start frontend
cd frontend && npm start
```

## 📚 Documentation

### [User Guide](./user_guide.md)
Complete guide for end users including:
- How to navigate the application
- User registration and authentication
- Profile management
- Available features and functionality

### [Developer Guide](./developer_guide.md)
Comprehensive technical documentation for developers:
- Project architecture and structure
- API documentation
- Frontend components and routing
- Database schema
- Deployment instructions

### [API Documentation](./api_documentation.md)
Detailed API reference including:
- Authentication endpoints
- User management endpoints
- Request/response examples
- Error handling

## 🏗️ Project Structure

```
rubidsoft-company-site/
├── api/                    # Express.js backend
│   ├── config/            # Configuration files
│   ├── features/          # Feature modules
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── index.js           # Main server file
├── frontend/              # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
└── docs/                  # Documentation
```

## 🎯 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (User/Admin)
- Secure password hashing
- Account lockout protection

### 👥 User Management
- User registration and login
- Profile management
- Password change functionality
- Admin user management

### 🛡️ Security Features
- Input validation and sanitization
- Rate limiting
- CORS protection
- Security headers

### 📱 Modern UI/UX
- Responsive design with Tailwind CSS
- Role-based navigation
- Modern component architecture
- Optimized performance

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## 🌐 Live Demo

- **Frontend**: [https://your-domain.com](https://your-domain.com)
- **API**: [https://api.your-domain.com](https://api.your-domain.com)

## 📊 API Status

Check the API health status: [Health Check](https://api.your-domain.com/api/health)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./contributing.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 📞 Support

- **Documentation**: [https://your-domain.com/docs](https://your-domain.com/docs)
- **Issues**: [GitHub Issues](https://github.com/your-username/rubidsoft-company-site/issues)
- **Email**: support@rubidsoft.com

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting service
```

### API Deployment
```bash
cd api
npm install --production
NODE_ENV=production npm start
```

## 📈 Performance

- **Frontend**: Optimized with React 18 features
- **API**: Rate limited and secured
- **Database**: Indexed for optimal queries
- **Assets**: Compressed and cached

---

**Built with ❤️ by the Rubidsoft Team**

*Last updated: June 2024*
