# Admin Panel API Integration Guide

## Overview
I have successfully updated your admin panel to use real API data instead of dummy data. All admin pages now connect to your backend API to fetch, create, update, and delete data.

## Changes Made

### 1. Updated Admin Dashboard (`frontend/src/pages/admin/AdminDashboard.jsx`)
- **Before**: Used hardcoded dummy data for stats and recent activities
- **After**: Fetches real data from API endpoints:
  - Dashboard stats from `/api/dashboard/stats`
  - Recent orders from `/api/orders`
  - Recent contacts from `/api/contact`
  - Recent tasks from `/api/tasks`
- **Features**: Loading states, error handling, real-time data updates

### 2. Updated Orders Management (`frontend/src/pages/admin/Orders.jsx`)
- **Before**: Static dummy orders array
- **After**: Full CRUD operations with API:
  - Fetch orders from `/api/orders`
  - Update order status via `/api/orders/:id/status`
  - Update payment status via `/api/orders/:id`
  - Real-time filtering and search
- **Features**: Status management, payment tracking, order details modal

### 3. Updated Contact Management (`frontend/src/pages/admin/Contact.jsx`)
- **Before**: Static dummy contacts array
- **After**: Full contact management with API:
  - Fetch contacts from `/api/contact`
  - Update contact status via `/api/contact/:id/status`
  - Add responses via `/api/contact/:id/responses`
  - Delete contacts via `/api/contact/:id`
- **Features**: Status tracking, response management, spam filtering

### 4. Updated Services Management (`frontend/src/pages/admin/Services.jsx`)
- **Before**: Static dummy services array
- **After**: Complete service management with API:
  - Fetch services from `/api/services`
  - Create new services via `/api/services`
  - Update services via `/api/services/:id`
  - Toggle active/featured status
  - Delete services
- **Features**: Service creation, pricing management, feature lists

### 5. Updated Tasks Management (`frontend/src/pages/admin/Tasks.jsx`)
- **Before**: Static dummy tasks array
- **After**: Full task management with API:
  - Fetch tasks from `/api/tasks`
  - Create tasks via `/api/tasks`
  - Update task status via `/api/tasks/:id/status`
  - Assign tasks to users
  - Delete tasks
- **Features**: Task assignment, status tracking, user management

### 6. Updated Blog Management (`frontend/src/pages/admin/Blog.jsx`)
- **Before**: Static dummy blog posts array
- **After**: Complete blog management with API:
  - Fetch blog posts from `/api/blog`
  - Create posts via `/api/blog`
  - Update posts via `/api/blog/:id`
  - Toggle featured/published status
  - Delete posts
- **Features**: SEO management, content editing, publishing workflow

## API Service Integration

All admin pages now use the existing `apiService.js` which includes:
- Authentication handling with JWT tokens
- Error handling and retry logic
- Request/response interceptors
- Proper API endpoint mapping

## Testing the Integration

### Prerequisites
1. **API Server**: Make sure your backend API is running on `http://localhost:5000`
2. **Database**: Ensure MongoDB is connected and running
3. **Frontend**: Start the React frontend on `http://localhost:3000`

### Step 1: Test API Connection
```bash
cd api
node test-api.js
```

This will test:
- Health check endpoint
- Public endpoints (projects, services, blog)
- API connectivity

### Step 2: Create Admin User
You need an admin user to access the admin panel. Create one via the API:

```bash
# Register an admin user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Step 3: Login and Get Token
```bash
# Login to get authentication token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Step 4: Create Sample Data
Use the test script to create sample data:

```javascript
// In test-api.js, uncomment and add your token:
createSampleData('your-auth-token-here');
```

### Step 5: Test Admin Panel
1. Open `http://localhost:3000/admin` in your browser
2. Login with admin credentials
3. Navigate through different admin pages
4. Test CRUD operations:
   - Create new services, blog posts, tasks
   - Update statuses and information
   - Delete items
   - Filter and search functionality

## API Endpoints Used

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/orders?limit=3&sort=-createdAt` - Recent orders
- `GET /api/contact?limit=3&sort=-createdAt` - Recent contacts
- `GET /api/tasks?limit=3&sort=-createdAt` - Recent tasks

### Orders
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id` - Update order details

### Contacts
- `GET /api/contact` - Get all contacts
- `PATCH /api/contact/:id/status` - Update contact status
- `POST /api/contact/:id/responses` - Add response
- `DELETE /api/contact/:id` - Delete contact

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `PATCH /api/services/:id/toggle-active` - Toggle active status
- `PATCH /api/services/:id/toggle-featured` - Toggle featured status
- `DELETE /api/services/:id` - Delete service

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `PATCH /api/tasks/:id/assign` - Assign task
- `DELETE /api/tasks/:id` - Delete task

### Blog
- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create blog post
- `PUT /api/blog/:id` - Update blog post
- `PATCH /api/blog/:id/toggle-featured` - Toggle featured status
- `PATCH /api/blog/:id/publish` - Toggle publish status
- `DELETE /api/blog/:id` - Delete blog post

## Error Handling

All admin pages now include:
- **Loading States**: Spinner while fetching data
- **Error States**: Error messages with retry options
- **Success Feedback**: Confirmation messages for actions
- **Network Error Handling**: Automatic retry and user feedback

## Authentication

The admin panel uses JWT authentication:
- Tokens are stored in localStorage
- Automatic token refresh on API calls
- Redirect to login on authentication failure
- Role-based access control (admin only)

## Data Structure Changes

The admin panel now expects data in the format returned by your API:
- Uses `_id` instead of `id` for MongoDB ObjectIds
- Handles nested objects (e.g., `customer.name`, `service.title`)
- Supports pagination and filtering
- Handles date formatting and timezone conversion

## Next Steps

1. **Test all functionality** in the admin panel
2. **Create sample data** for testing
3. **Verify all CRUD operations** work correctly
4. **Test error scenarios** (network issues, validation errors)
5. **Add more features** as needed (bulk operations, exports, etc.)

## Troubleshooting

### Common Issues:
1. **API not running**: Start the API server with `npm start` in the api directory
2. **Database connection**: Check MongoDB connection in API logs
3. **Authentication errors**: Verify JWT token and user role
4. **CORS issues**: Check CORS configuration in API
5. **Missing data**: Create sample data using the test script

### Debug Tips:
- Check browser console for API errors
- Verify API endpoints are accessible
- Test API directly with tools like Postman
- Check network tab for failed requests

## Conclusion

Your admin panel is now fully integrated with your backend API and ready to manage real data. All dummy data has been replaced with live API calls, and the interface provides a complete management system for your company website. 