# WebApp Admin Client - Kula

A modern, secure admin dashboard application with dual-role authentication and role-based access control (RBAC). Built with React, TypeScript, Vite, and Supabase authentication.

## 🎯 Project Overview

This project implements a comprehensive admin and client management system with:

- **Supabase Email/Password Authentication** - Secure session management via Supabase
- **Dual-Role Dashboard System** - Separate interfaces for Super Admin (`/SA/*`) and Client (`/client/*`)
- **Role-Based Access Control (RBAC)** - Protected routes that validate user roles
- **Secure API Communication** - Dual axios instances (authenticated for dashboard, public for widgets)
- **Modern UI/UX** - Glassmorphic design with TailwindCSS and Material-UI
- **TypeScript Type Safety** - Full end-to-end type coverage

## ✨ Key Features

- ✅ Email/password authentication with Supabase
- ✅ Session management with automatic token refresh
- ✅ Role-based route protection
- ✅ Dual dashboard layouts (Super Admin & Client)
- ✅ Dynamic user profile display
- ✅ Secure axios interceptors with 401 handling
- ✅ Environment-based configuration
- ✅ Loading state management
- ✅ Access denied (403) handling
- ✅ Professional login UI with keyboard support

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Button.tsx              # Reusable button component
│   ├── Drawer.tsx              # Drawer component
│   ├── ProtectedRoute.tsx       # Route guard with role validation ⭐
│   └── StatCard.tsx            # Statistics card component
├── context/
│   └── AuthContext.tsx         # Authentication provider with session & role management ⭐
├── layout/
│   ├── adminLayout/
│   │   ├── Layout.tsx          # Admin dashboard layout
│   │   ├── Sidebar.tsx         # Admin sidebar with user profile
│   │   ├── SidebarMenu.tsx     # Admin menu items
│   │   └── TopBar.tsx          # Admin top navigation
│   └── clientLayout/
│       ├── ClientLayout.tsx    # Client dashboard layout
│       ├── ClientHeder.tsx     # Client header
│       └── ClientSidebar.tsx   # Client sidebar with user profile
├── login/
│   └── Login.tsx               # Email/password login form ⭐
├── pages/
│   ├── adminPanel/
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   ├── Clients.tsx
│   │   ├── Billing.tsx
│   │   ├── Subscription.tsx
│   │   ├── Support.tsx
│   │   ├── Chatbot.tsx
│   │   ├── Intergrations.tsx
│   │   ├── Security.tsx
│   │   ├── Settings.tsx
│   │   ├── Usage.tsx
│   │   └── AddClient.tsx
│   ├── clientPanel/
│   │   └── ClientDashboard.tsx
│   └── NoAccess.tsx            # 403 error page with sign-out option ⭐
├── utils/
│   ├── supabase.ts             # Supabase client initialization ⭐
│   ├── instance.ts             # Authenticated axios instance with interceptors ⭐
│   ├── publicInstance.ts       # Public axios instance (no auth) ⭐
│   └── API_CLIENTS_GUIDE.ts    # API client usage documentation
├── App.tsx                     # Main app with routing and AuthProvider wrapper
├── types.tsx                   # TypeScript interfaces and types
├── main.tsx                    # React entry point
├── tailwind.config.ts          # TailwindCSS configuration
└── index.html                  # HTML template
```

### Key Files

⭐ **Critical for Auth System:**
- `src/context/AuthContext.tsx` - Central authentication provider managing session, role, and loading states
- `src/components/ProtectedRoute.tsx` - Route guard enforcing authentication and role validation
- `src/login/Login.tsx` - Login form with Supabase auth
- `src/utils/supabase.ts` - Supabase client singleton
- `src/utils/instance.ts` - Authenticated HTTP client with token attachment and 401 handling
- `src/pages/NoAccess.tsx` - Access denied page with context-aware messaging

## 🔐 Authentication Flow

```
1. User visits app → AuthContext initializes
   ↓
2. AuthContext calls Supabase.auth.onAuthStateChange()
   ↓
3a. Session exists → Fetch user role from GET /api/me
   3b. No session → Skip role fetch, display login
   ↓
4. ProtectedRoute checks session + role
   ↓
5a. Both valid → Redirect to /SA/* (admin) or /client/* (client)
   5b. Session exists, no role → Redirect to /no-access?reason=no-role
   5c. Wrong role → Redirect to /no-access?reason=role-mismatch
   5d. No session → Redirect to /login
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account with project created
- Backend API running at `http://localhost:5001/api` (or custom URL via env var)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd WebApp-Admin-client-kula
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create `.env.local` in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_API_BASE_URL=http://localhost:5001/api
   ```

   To get these values:
   - Log in to [Supabase Dashboard](https://app.supabase.com)
   - Select your project → Settings → API
   - Copy the URL and `anon` key

4. **Start development server**
   ```bash
   npm run dev
   ```

   Application runs at `http://localhost:5173` (or next available port)

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://project-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5001/api` |

**Note:** Environment variables prefixed with `VITE_` are exposed to the client-side code. Never store sensitive secrets in these variables.

## 🔌 Backend API Requirements

The backend must provide the following endpoints:

### GET `/api/me`
**Purpose:** Fetch current authenticated user's role and profile information

**Authentication:** Requires `Authorization: Bearer <session_token>` header

**Response Format:**
```json
{
  "role": "super_admin",
  "client_id": 1,
  "user_name": "John Doe"
}
```

**Fields:**
- `role` (string): User role - either `"super_admin"` or `"client"`
- `client_id` (number | string, optional): Client ID if role is `"client"`
- `user_name` (string, optional): Display name of the user

**Status Codes:**
- `200` - Successfully authenticated and returned user data
- `401` - Invalid or expired session token
- `403` - User authenticated but not configured with role

The axios instance automatically:
- Attaches the session token to the Authorization header
- Redirects to `/login` on 401 responses (except for `/api/me` itself)

## 📦 Dependencies

### Core Stack
- **react** `^18.2.0` - UI library
- **typescript** `~5.9.3` - Type safety
- **vite** `^7.2.4` - Build tool with HMR
- **react-router-dom** `^6.20.0` - Client-side routing

### Authentication & HTTP
- **@supabase/supabase-js** `^2.48.0` - Supabase client
- **axios** `^1.13.2` - HTTP client with interceptors

### UI & Styling
- **tailwindcss** `^4.1.18` - Utility-first CSS
- **@emotion/react** `^11.14.0` - CSS-in-JS
- **@mui/material** `^7.3.7` - Material Design components

### Development Tools
- **eslint** `^9.0.0` - Code linting
- **@vitejs/plugin-react** `^4.2.0` - React fast refresh plugin
- **autoprefixer** `^10.4.20` - CSS vendor prefixes

## 🔒 Security Considerations

1. **Session Management**
   - Sessions stored in Supabase `auth` system with localStorage persistence
   - Tokens automatically refreshed on API requests
   - 401 responses redirect to login (automatic re-authentication)

2. **API Communication**
   - All dashboard API calls include Bearer token in Authorization header
   - Public API calls (widgets) use separate axios instance without auth
   - CORS and XSS protections via modern browser standards

3. **Route Protection**
   - ProtectedRoute validates both session existence and user role
   - Unauthorized users receive clear 403 error with context-aware messaging
   - Prevents authenticated users without roles from accessing dashboards

4. **Environment Variables**
   - `VITE_SUPABASE_ANON_KEY` is exposed to client (this is safe - it's "anon" for public access)
   - Never store private keys, passwords, or sensitive data in `.env.local`
   - Backend API keys kept secure on server-side only

5. **Type Safety**
   - TypeScript prevents runtime type errors
   - Interfaces validate API response structures

## ✅ Completed Features

- ✅ Supabase authentication setup with email/password provider
- ✅ Session management with automatic token persistence
- ✅ Role-based access control (super_admin, client)
- ✅ Protected route component with role validation
- ✅ Dual dashboard layouts (Super Admin & Client)
- ✅ Login form with professional UI and keyboard support
- ✅ Axios interceptors for automatic token attachment
- ✅ Axios interceptors for 401 handling and redirect
- ✅ Public axios instance (separate from authenticated)
- ✅ NoAccess (403) page with context-aware messages
- ✅ Dynamic user profile display in sidebars
- ✅ Environment-based configuration
- ✅ Memory leak prevention in AuthContext
- ✅ Proper loading state management
- ✅ Centered loading spinner with fixed positioning

## 🚧 Future Enhancements

- [ ] Social authentication (Google, GitHub OAuth)
- [ ] Two-factor authentication (2FA)
- [ ] Password reset flow
- [ ] Email verification
- [ ] Role-based permissions system
- [ ] Audit logging
- [ ] Session timeout warnings
- [ ] Device management
- [ ] Advanced user management interface
- [ ] Comprehensive error tracking/monitoring

## 🧪 Testing

### Manual End-to-End Flow

1. **Fresh Login Test**
   - Navigate to `http://localhost:5173/`
   - Should redirect to `/login`
   - Enter valid credentials (super_admin or client account)
   - Should redirect to `/SA/dashboard` (admin) or `/client/` (client)

2. **Protected Route Test**
   - Try direct navigation to `/SA/dashboard` without logging in
   - Should redirect to `/login`
   - Log in and verify dashboard loads

3. **Role Mismatch Test**
   - Log in as client, try direct navigation to `/SA/*`
   - Should redirect to `/no-access?reason=role-mismatch`

4. **No Role Test**
   - Test with user authenticated but no role assigned
   - Should redirect to `/no-access?reason=no-role`
   - Should show "Sign Out" button

5. **Tab Switch Test**
   - Log in successfully, open developer tools, switch tabs
   - Loading spinner should not persist when returning to tab
   - Dashboard should load normally

6. **Keyboard Navigation**
   - On login form, press Enter in email field, then password field
   - Should submit form and log in

## 📚 Usage Examples

### Using Authenticated HTTP Client

```typescript
import instance from '@/utils/instance';

// GET request
const { data } = await instance.get('/users');

// POST request
const { data } = await instance.post('/clients', {
  name: 'New Client',
  email: 'client@example.com'
});

// Automatically includes Bearer token in Authorization header
// Automatically redirects to /login on 401
```

### Using Public HTTP Client

```typescript
import publicInstance from '@/utils/publicInstance';

// No authentication required
const { data } = await publicInstance.get('/public-data');
```

### Using AuthContext in Components

```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { session, userRole, authLoading, roleLoading } = useAuth();

  if (authLoading || roleLoading) return <LoadingSpinner />;
  if (!session) return <Redirect to="/login" />;

  return (
    <div>
      Welcome, {userRole?.userName}! Your role: {userRole?.role}
    </div>
  );
}
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

## 📝 License

This project is part of the Kula suite. See LICENSE file for details.

## 🆘 Troubleshooting

### "Invalid Credentials" on Login
- Verify user exists in Supabase auth
- Check email and password are correct
- Confirm Supabase project is active

### "Role not found" (Redirects to /no-access)
- Ensure backend `/api/me` endpoint returns valid role
- Verify user is configured in dashboard_users table
- Check role is either "super_admin" or "client"

### 401 Loop on Page Refresh
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check backend API is running and accessible
- Verify session token is being stored in localStorage

### Loading Spinner Never Disappears
- Check browser console for errors in AuthContext
- Verify `/api/me` endpoint is responding
- Check network tab for failed API requests

### CORS Errors
- Verify backend CORS configuration includes your Vite dev URL
- Check backend is running on correct port
- Verify `VITE_API_BASE_URL` matches backend URL

## 📞 Support

For issues or questions, contact the development team or file an issue in the repository.

---

**Last Updated:** 2024
**Status:** Production Ready ✅
