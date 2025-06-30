# Frontend Application

A modern React application with user and admin roles, built with Redux Toolkit, React Router, and Tailwind CSS.

## Features

### 🔐 Authentication & Authorization
- User and Admin role-based access control
- Protected routes with role verification
- JWT token management
- Automatic token refresh and logout

### 👥 User Features
- User dashboard with personal statistics
- Order history and tracking
- Profile management
- Wishlist functionality

### 🛠️ Admin Features
- Admin dashboard with analytics
- User management
- Product management
- Order management
- System settings

### 🎨 UI/UX
- Modern, responsive design with Tailwind CSS
- Toast notifications
- Loading states
- Error handling
- Mobile-friendly interface

## Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Header.jsx
│   │   └── AdminHeader.jsx
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin-specific pages
│   │   │   └── AdminDashboard.jsx
│   │   └── user/           # User-specific pages
│   │       ├── Home.jsx
│   │       ├── About.jsx
│   │       ├── Contact.jsx
│   │       ├── Works.jsx
│   │       └── UserDashboard.jsx
│   ├── store/              # Redux store
│   │   ├── store.js
│   │   ├── userSlice.js
│   │   └── productSlice.js
│   ├── services/           # API services
│   │   └── userService.js
│   ├── constants/          # App constants
│   │   └── apiConstants.js
│   ├── hooks/              # Custom hooks
│   │   └── useAuth.js
│   ├── utils/              # Utility functions
│   │   └── formatDate.js
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
├── public/                 # Static assets
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Routing

### Public Routes
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/works` - Works/Portfolio page
- `/login` - Login page

### Protected Routes

#### User Routes (requires authentication)
- `/user` - User dashboard
- `/user/profile` - User profile
- `/user/orders` - User orders

#### Admin Routes (requires admin role)
- `/admin` - Admin dashboard
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/settings` - Admin settings

## State Management

The application uses Redux Toolkit for state management with the following slices:

### User Slice
- Authentication state
- User profile data
- Role management
- Loading states

### Product Slice
- Product data
- Product selection
- Loading states

## API Integration

The application integrates with a backend API through:

- **Axios** for HTTP requests
- **Interceptors** for automatic token handling
- **Error handling** for API failures
- **Service layer** for organized API calls

## Styling

The application uses Tailwind CSS for styling with:
- Responsive design
- Dark mode support (ready for implementation)
- Custom component styling
- Utility-first approach

## Authentication Flow

1. User logs in with credentials
2. Backend validates and returns JWT token
3. Token is stored in localStorage
4. User role is determined and stored
5. Protected routes check authentication and role
6. Automatic logout on token expiration

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for better type safety (recommended)
- Write meaningful component and function names

### File Naming
- Use PascalCase for components
- Use camelCase for utilities and services
- Use kebab-case for CSS classes

### Component Structure
```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  // Component logic here
  
  return (
    <div>
      {/* JSX here */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default ComponentName;
```

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Set the following environment variables:
- `REACT_APP_API_URL` - Production API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository. 