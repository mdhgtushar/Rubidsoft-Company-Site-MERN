# Frontend Folder Structure

## 📁 **Organized Structure**

```
frontend/src/
├── 📁 layouts/                    # Layout Components
│   ├── ClientLayout.jsx          # Public site layout with header
│   ├── AdminLayout.jsx           # Admin panel layout with sidebar
│   └── UserDashboardLayout.jsx   # User dashboard layout
│
├── 📁 pages/                      # Page Components
│   ├── 📁 public/                # Public pages (no auth required)
│   │   ├── Home.jsx              # Landing page
│   │   ├── About.jsx             # About us page
│   │   ├── Contact.jsx           # Contact page
│   │   └── Works.jsx             # Portfolio/works page
│   │
│   ├── 📁 admin/                 # Admin pages (admin auth required)
│   │   ├── AdminDashboard.jsx    # Admin dashboard
│   │   ├── ClientList.jsx        # Client management
│   │   ├── Tasks.jsx             # Task management
│   │   ├── Blog.jsx              # Blog management
│   │   ├── Services.jsx          # Services management
│   │   └── Contact.jsx           # Contact management
│   │
│   └── 📁 user/                  # User pages (user auth required)
│       └── UserDashboard.jsx     # User dashboard
│
├── 📁 components/                 # Reusable Components
│   ├── Header.jsx                # Main site header
│   ├── AdminHeader.jsx           # Admin panel header
│   ├── Footer.jsx                # Site footer
│   ├── Project.jsx               # Project card component
│   ├── Button.jsx                # Button component
│   └── MenuButton1.jsx           # Menu button component
│
├── 📁 hooks/                      # Custom React Hooks
│   └── useAuth.js                # Authentication hook
│
├── 📁 services/                   # API Services
│   └── userService.js            # User-related API calls
│
├── 📁 store/                      # Redux Store
│   ├── store.js                  # Redux store configuration
│   ├── userSlice.js              # User state management
│   └── productSlice.js           # Product state management
│
├── 📁 utils/                      # Utility Functions
│   ├── formatDate.js             # Date formatting utilities
│   └── theme.js                  # Theme utilities
│
├── 📁 constants/                  # Constants & Configuration
│   └── apiConstants.js           # API endpoints and constants
│
├── App.js                        # Main App component with routing
├── index.js                      # App entry point
└── index.css                     # Global styles
```

## 🎯 **Layout Structure**

### **ClientLayout** (Public Site)
- **Purpose**: Main website layout for public pages
- **Features**: Header, main content area, footer
- **Used for**: Home, About, Contact, Works pages

### **AdminLayout** (Admin Panel)
- **Purpose**: Admin dashboard layout
- **Features**: Fixed sidebar, scrollable main content
- **Used for**: All admin pages

### **UserDashboardLayout** (User Dashboard)
- **Purpose**: User dashboard layout
- **Features**: Header, dashboard content area
- **Used for**: User dashboard pages

## 📋 **Page Organization**

### **Public Pages** (`/pages/public/`)
- **No authentication required**
- **Accessible to all visitors**
- **Uses ClientLayout**

### **Admin Pages** (`/pages/admin/`)
- **Admin authentication required**
- **Uses AdminLayout**
- **Fixed sidebar navigation**

### **User Pages** (`/pages/user/`)
- **User authentication required**
- **Uses UserDashboardLayout**
- **Dashboard-style interface**

## 🔧 **Benefits of This Structure**

1. **Clear Separation**: Layouts, pages, and components are clearly separated
2. **Scalable**: Easy to add new pages and components
3. **Maintainable**: Logical organization makes code easier to find and maintain
4. **Consistent**: Each type of page uses the appropriate layout
5. **Secure**: Proper route protection based on user roles

## 🚀 **Adding New Pages**

### **Public Page**
```javascript
// Create: pages/public/NewPage.jsx
// Add route in App.js under ClientLayout
<Route path="new-page" element={<NewPage />} />
```

### **Admin Page**
```javascript
// Create: pages/admin/NewAdminPage.jsx
// Add route in App.js under AdminLayout
<Route path="new-admin-page" element={<NewAdminPage />} />
```

### **User Page**
```javascript
// Create: pages/user/NewUserPage.jsx
// Add route in App.js under UserDashboardLayout
<Route path="new-user-page" element={<NewUserPage />} />
```

## 📝 **Naming Conventions**

- **Layouts**: `[Name]Layout.jsx`
- **Pages**: `[PageName].jsx`
- **Components**: `[ComponentName].jsx`
- **Hooks**: `use[Name].js`
- **Services**: `[name]Service.js`
- **Utils**: `[name].js`
- **Constants**: `[name]Constants.js` 