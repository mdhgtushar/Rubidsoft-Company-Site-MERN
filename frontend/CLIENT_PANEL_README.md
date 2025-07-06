# Client Panel - User Dashboard

## Overview

The Client Panel is a comprehensive user dashboard that allows clients to manage their orders, tasks, and profile information. All data is fetched from the backend API we developed earlier.

## Features

### 🏠 Dashboard
- **Overview Statistics**: View total orders, tasks, completed tasks, and pending tasks
- **Recent Orders**: Quick view of your latest 5 orders with status indicators
- **Recent Tasks**: Quick view of your latest 5 assigned tasks with priority and status
- **Quick Actions**: Easy access to place new orders, view all orders, and view all tasks

### 📦 Orders Management
- **Order List**: View all your orders with filtering and search capabilities
- **Order Details**: Detailed view of each order including:
  - Service information
  - Requirements and specifications
  - Pricing breakdown
  - Order timeline
  - Message history with the team
- **Order Status Tracking**: Real-time status updates (pending, confirmed, in-progress, completed, cancelled)
- **Communication**: Send messages to the team about your order

### ✅ Tasks Management
- **Task List**: View all assigned tasks with filtering by status and priority
- **Task Details**: Comprehensive task information including:
  - Task description and requirements
  - Assignment details
  - Due dates and estimated hours
  - Comments and updates
  - Related order information
- **Status Updates**: Update task status (pending, in-progress, completed)
- **Comments**: Add comments to tasks for better communication

### 👤 Profile Management
- **Personal Information**: Update name, email, phone, and company details
- **Address Information**: Manage your complete address details
- **Password Management**: Change your account password securely
- **Account Summary**: View account creation date and role information

## Getting Started

### Prerequisites
1. Backend API server running (from the `api` folder)
2. Frontend dependencies installed
3. User account created and logged in

### Installation

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API URL**:
   Update the `API_BASE_URL` in `src/constants/apiConstants.js` to match your backend server:
   ```javascript
   export const API_BASE_URL = 'http://localhost:5000/api';
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

### Environment Variables

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Usage Guide

### Accessing the Client Panel

1. **Login**: Navigate to `/login` and enter your credentials
2. **Dashboard**: After login, you'll be redirected to `/user/dashboard`
3. **Navigation**: Use the sidebar to navigate between different sections

### Dashboard Features

#### Statistics Cards
- **Total Orders**: Shows the number of orders you've placed
- **Total Tasks**: Shows the number of tasks assigned to you
- **Completed Tasks**: Shows tasks marked as completed
- **Pending Tasks**: Shows tasks that are not yet completed

#### Recent Activity
- **Recent Orders**: Click "View all" to see all your orders
- **Recent Tasks**: Click "View all" to see all your tasks
- **Quick Actions**: 
  - "Place New Order" - Redirects to order form
  - "View Orders" - Shows all orders
  - "View Tasks" - Shows all tasks

### Managing Orders

#### Viewing Orders
1. Navigate to "My Orders" from the sidebar
2. Use filters to search by status or keywords
3. Click on any order to view details

#### Order Details Page
- **Service Information**: View the service you ordered
- **Requirements**: See your specified requirements
- **Pricing**: View the complete pricing breakdown
- **Messages**: Send and receive messages with the team
- **Timeline**: Track order progress

#### Sending Messages
1. Scroll to the "Messages" section
2. Type your message in the text area
3. Click "Send Message"
4. Messages are sent to the team and will appear in the conversation

### Managing Tasks

#### Viewing Tasks
1. Navigate to "My Tasks" from the sidebar
2. Use filters to search by status, priority, or keywords
3. Click on any task to view details

#### Task Details Page
- **Task Information**: View task title, description, and requirements
- **Assignment Details**: See who assigned the task and when
- **Status Updates**: Update task status as you work
- **Comments**: Add comments about your progress
- **Related Order**: Link to the associated order

#### Updating Task Status
1. In the task details page, find the "Update Status" section
2. Click on the appropriate status button:
   - "Mark as pending"
   - "Mark as in-progress"
   - "Mark as completed"

#### Adding Comments
1. Scroll to the "Comments" section
2. Type your comment in the text area
3. Click "Send Comment"
4. Comments will appear in the conversation thread

### Profile Management

#### Updating Personal Information
1. Navigate to "Profile" from the sidebar
2. Click "Edit" in the Basic Information section
3. Update your details:
   - Full Name
   - Email Address
   - Phone Number
   - Company
4. Click "Save Changes"

#### Updating Address
1. In the Profile page, find the "Address Information" section
2. Update your address details:
   - Street Address
   - City
   - State/Province
   - ZIP/Postal Code
   - Country
3. Changes are saved automatically when you save the basic information

#### Changing Password
1. In the Profile page, find the "Security" section
2. Click "Change Password"
3. Enter your current password
4. Enter your new password twice
5. Click "Update Password"

## API Integration

The client panel integrates with the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/users/profile` - Get user profile

### Orders
- `GET /api/orders/user/me` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:id/messages` - Add order message

### Tasks
- `GET /api/tasks/user/me` - Get user tasks
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `POST /api/tasks/:id/comments` - Add task comment

### Profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

## File Structure

```
frontend/src/
├── pages/user/
│   ├── UserDashboard.jsx      # Main dashboard
│   ├── UserOrders.jsx         # Orders list
│   ├── UserTasks.jsx          # Tasks list
│   ├── UserProfile.jsx        # Profile management
│   ├── OrderDetail.jsx        # Order details
│   └── TaskDetail.jsx         # Task details
├── services/
│   └── apiService.js          # API service functions
├── layouts/
│   └── UserDashboardLayout.jsx # User panel layout
└── constants/
    └── apiConstants.js        # API configuration
```

## Styling

The client panel uses:
- **Tailwind CSS** for styling
- **React Icons** for icons
- **Responsive design** that works on all devices
- **Modern UI** with clean, professional appearance

## Security Features

- **Protected Routes**: All user pages require authentication
- **Role-based Access**: Different features based on user role
- **Token-based Authentication**: Secure API communication
- **Auto-logout**: Automatic logout on authentication errors

## Error Handling

The client panel includes comprehensive error handling:
- **Network Errors**: Displays user-friendly error messages
- **Authentication Errors**: Redirects to login page
- **Validation Errors**: Shows specific error messages
- **Loading States**: Shows loading spinners during API calls

## Responsive Design

The client panel is fully responsive:
- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu with overlay

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Common Issues

1. **API Connection Error**:
   - Check if the backend server is running
   - Verify the API URL in `apiConstants.js`
   - Check network connectivity

2. **Authentication Issues**:
   - Clear browser storage and login again
   - Check if the token is valid
   - Ensure proper user role

3. **Data Not Loading**:
   - Check browser console for errors
   - Verify API endpoints are working
   - Check network tab for failed requests

### Debug Mode

To enable debug mode, add this to your browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## Support

For technical support or questions about the client panel:
1. Check the browser console for error messages
2. Verify API connectivity
3. Review the backend API documentation
4. Check the network tab for failed requests

## Future Enhancements

Potential improvements for the client panel:
- **Real-time Notifications**: WebSocket integration for live updates
- **File Upload**: Ability to upload files with messages
- **Calendar Integration**: Task due date calendar view
- **Email Notifications**: Email alerts for status changes
- **Mobile App**: Native mobile application
- **Advanced Filtering**: More sophisticated search and filter options
- **Export Features**: Export orders and tasks to PDF/Excel
- **Dark Mode**: Toggle between light and dark themes 