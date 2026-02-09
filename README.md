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

### Core Authentication & Security
- ✅ Email/password authentication with Supabase
- ✅ Session management with automatic token refresh
- ✅ Role-based access control (super_admin & client)
- ✅ Protected routes with role validation
- ✅ Dual axios instances (authenticated & public)
- ✅ Secure axios interceptors with 401 handling
- ✅ Environment-based configuration

### Admin Panel
- ✅ Dashboard with key metrics and overview
- ✅ Multi-step client creation wizard with subscriptions
- ✅ Subscription management (status, plan, period updates)
- ✅ Support ticket management with filtering
- ✅ Client rescraping and re-embedding
- ✅ Professional navigation menu with organized sections

### Client Portal
- ✅ Dashboard with knowledge base statistics
- ✅ Chatbot widget configuration (colors, position, greeting)
- ✅ Web scraper management with rescraping
- ✅ Conversation history viewer with pagination
- ✅ Quick action shortcuts for common tasks

### UI/UX
- ✅ Dynamic Coming Soon pages with custom icons
- ✅ Custom scrollbar styling (Chrome & Firefox)
- ✅ Improved layout spacing and max-width constraints
- ✅ Professional loading states and spinners
- ✅ Access denied (403) handling with context
- ✅ Glassmorphic design with TailwindCSS and Material-UI

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Button.tsx              # Reusable button component
│   ├── Drawer.tsx              # Drawer component
│   ├── ProtectedRoute.tsx       # Route guard with role validation ⭐
│   ├── StatCard.tsx            # Statistics card component
│   ├── FormCard.tsx            # Form card wrapper
│   ├── FormInput.tsx           # Form input component
│   ├── FormPosition.tsx        # Position selector component
│   ├── FormRadio.tsx           # Radio button component
│   ├── FormSelect.tsx          # Select dropdown component
│   ├── PlanCard.tsx            # Subscription plan card
│   ├── DeleteModal.tsx         # Delete confirmation modal
│   ├── EditModal.tsx           # Edit modal component
│   └── ViewModal.tsx           # View details modal
├── context/
│   └── AuthContext.tsx         # Authentication provider with session & role management ⭐
├── layout/
│   ├── adminLayout/
│   │   ├── Layout.tsx          # Admin dashboard layout (enhanced with max-width)
│   │   ├── Sidebar.tsx         # Admin sidebar with organized menu
│   │   ├── SidebarMenu.tsx     # Admin navigation menu items
│   │   └── TopBar.tsx          # Admin top navigation
│   └── clientLayout/
│       ├── ClientLayout.tsx    # Client dashboard layout (enhanced with max-width)
│       ├── ClientHeder.tsx     # Client header
│       └── ClientSidebar.tsx   # Client sidebar with organized menu
├── login/
│   └── Login.tsx               # Email/password login form ⭐
├── pages/
│   ├── ComingSoon.tsx          # Coming Soon component with custom icons ⭐
│   ├── adminPanel/
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx
│   │   ├── Clients.tsx
│   │   ├── Users.tsx
│   │   ├── Subscription.tsx    # Subscription management with modal
│   │   ├── Tickets.tsx         # Support tickets listing ⭐
│   │   ├── Settings.tsx
│   │   ├── Security.tsx
│   │   ├── Intergrations.tsx
│   │   └── AddClient.tsx       # 6-step client creation with subscriptions
│   ├── clientPanel/
│   │   ├── ClientDashboard.tsx # Dashboard with stats
│   │   ├── ChatbotConfiguration.tsx  # Widget configuration ⭐
│   │   ├── Conversations.tsx   # Message thread viewer ⭐
│   │   └── WebScraper.tsx      # URL management with rescraping ⭐
│   └── NoAccess.tsx            # 403 error page with sign-out option ⭐
├── utils/
│   ├── supabase.ts             # Supabase client initialization ⭐
│   ├── instance.ts             # Authenticated axios instance with interceptors ⭐
│   ├── publicInstance.ts       # Public axios instance (no auth) ⭐
│   ├── subscriptionApi.ts      # Subscription API utilities ⭐
│   ├── cssVariables.ts         # CSS variable getters
│   └── API_CLIENTS_GUIDE.ts    # API client usage documentation
├── App.tsx                     # Main app with routing and AuthProvider wrapper
├── App.css                     # Global styles (with custom scrollbars)
├── types.tsx                   # TypeScript interfaces and types
├── main.tsx                    # React entry point
├── tailwind.config.ts          # TailwindCSS configuration
└── index.html                  # HTML template
```

### Key Dashboard Enhancements (Latest)

**New Coming Soon Component**
- Dynamic Coming Soon pages with custom SVG icons
- Custom icons for Analytics, Chatbots, Billing, Usage, API Management, Settings, Security, Tickets, Logs, and Feedback
- Animated icon bouncing effect with gradient backgrounds
- Feature development status display

**Enhanced Admin Routes**
- New Admin panel routes: `/SA/billing`, `/SA/support`, `/SA/active-logs`, `/SA/user-feedback`, `/SA/api-management`
- All placeholder routes now use ComingSoon component instead of simple components
- Organized navigation menu with 4 sections (MAIN, MANAGEMENT, SUPPORT, SYSTEM)

**Enhanced Client Routes**
- New client portal routes: `/client/chatbot`, `/client/chatbot-config`, `/client/conversations`, `/client/web-scraper`
- Additional routes: `/client/test-chatbot`, `/client/tickets`, `/client/active-logs`, `/client/user-feedback`, `/client/api-management`
- Organized sidebar with 4 sections (MAIN, TRAINING, SUPPORT, SYSTEM)

**Subscription Management** ⭐
- Backend API integration for managing client subscriptions
- Real-time subscription status updates (active/expired/canceled)
- Subscription plan management (professional/business/enterprise)
- Support for trial periods with locked plan/period
- Modal interface for managing individual client subscriptions
- Comprehensive subscription utilities in `subscriptionApi.ts`

**Support Tickets Component** ⭐
- Support ticket listing for admin panel
- Filter by status (all, open, in-progress, resolved)
- Color-coded priority indicators
- Created date tracking
- Professional table layout

**Chatbot Configuration** ⭐
- Client-facing widget customization interface
- Color picker for primary and secondary colors
- Widget position selector (bottom-right, bottom-left)
- Welcome message customization (200 char limit)
- Save and reset functionality with success feedback

**Web Scraper Component** ⭐
- URL management interface for client panel
- Rescrape functionality with automatic embeddings
- Statistics display (chunks, words per URL)
- Success/error feedback messages
- Real-time progress indication with spinning icon

**Conversations Viewer** ⭐
- View conversation history with pagination
- Filter conversations by status (all, active, closed)
- Message thread display with timestamps
- Visitor ID tracking and conversation details
- Clean message layout with role-based styling

**Client Dashboard Stats** ⭐
- Knowledge base statistics (scraped URLs, chunks, words)
- Quick action shortcuts to common features
- Recent updates section with getting started tips
- Responsive grid layout with icon indicators

**Layout Improvements**
- Admin layout main content uses `flex-1` for proper spacing
- Client layout mirrors admin layout improvements
- Max-width container (max-w-7xl) for optimal readability
- Enhanced padding (px-7 py-6) and spacing throughout
- Removed display: flex from root element for better responsiveness

**UI/UX Enhancements**
- Custom scrollbar styling for webkit (Chrome/Safari) and Firefox
- Thin scrollbar with gray styling (#D1D5DB)
- Hover state with darker gray (#9CA3AF)
- Transparent background for scrollbar track
- Improved overall visual hierarchy and spacing

### Key Files

⭐ **Critical for Auth System:**
- `src/context/AuthContext.tsx` - Central authentication provider managing session, role, and loading states
- `src/components/ProtectedRoute.tsx` - Route guard enforcing authentication and role validation
- `src/login/Login.tsx` - Login form with Supabase auth
- `src/utils/supabase.ts` - Supabase client singleton
- `src/utils/instance.ts` - Authenticated HTTP client with token attachment and 401 handling
- `src/pages/NoAccess.tsx` - Access denied page with context-aware messaging

⭐ **Dashboard Features (New):**
- `src/pages/ComingSoon.tsx` - Coming Soon component with customizable content and icons
- `src/utils/subscriptionApi.ts` - Subscription management utilities
- `src/pages/adminPanel/Subscription.tsx` - Admin subscription management interface
- `src/pages/adminPanel/Tickets.tsx` - Support tickets listing and filtering
- `src/pages/clientPanel/ChatbotConfiguration.tsx` - Widget customization interface
- `src/pages/clientPanel/WebScraper.tsx` - URL and scraping management
- `src/pages/clientPanel/Conversations.tsx` - Conversation viewer with pagination

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

### Client Management Endpoints

**POST `/admin/clients`** - Create new client with company info and subscription config
**GET `/admin/clients`** - List all clients with pagination
**GET `/admin/clients/:id`** - Get client details including embed_script
**PUT `/admin/clients/:id`** - Update client status (activate/deactivate)

### Subscription Management Endpoints ⭐

**GET `/admin/clients/with-subscriptions/:status`** - Get all clients with subscriptions (optimized single call)
- **Status:** `active` | `inactive`
- **Response:** Array of clients with subscription objects
- **Fields:** `id`, `company_name`, `subscription` (SubscriptionObject | null), `has_subscription`

**GET `/admin/clients/:clientId/subscription`** - Get specific client subscription
- **Response:** `{ success: boolean, subscription: SubscriptionObject | null }`

**POST `/admin/clients/:clientId/subscription/status`** - Update subscription status
- **Body:** `{ status: 'active' | 'expired' | 'canceled' }`
- **Response:** `{ success: boolean, subscription: SubscriptionObject }`

**POST `/admin/clients/:clientId/subscription/plan`** - Update subscription plan
- **Body:** `{ plan: 'professional' | 'business' | 'enterprise' }`
- **Response:** `{ success: boolean, subscription: SubscriptionObject }`

### Scraper & Embeddings Endpoints

**POST `/scraper/crawl-domain`** - Initiate domain scraping
- **Headers:** `x-api-key`
- **Body:** `{ websiteUrl: string }`
- **Response:** `{ jobId: string }`

**GET `/scraper/job/:jobId`** - Get scraping job status
- **Headers:** `x-api-key`
- **Query:** `client_id` (optional for tracking)
- **Response:** `{ status: 'processing' | 'completed' | 'failed' }`

**POST `/scraper/scrape-batch`** - Rescrape multiple URLs (client panel)
- **Headers:** `Authorization: Bearer <session_token>`
- **Body:** `{ urls: string[] }`
- **Response:** `{ successCount: number, results: Array }`

**GET `/scraper/content`** - Get list of scraped URLs (client access)
- **Response:** `{ content: Array<{ url, pageTitle, totalChunks, scrapedAt }> }`

**GET `/scraper/chunk-stats`** - Get statistics about scraped content (client access)
- **Response:** `{ totalUrls, totalChunks, totalWords, urlStats: object }`

**POST `/embeddings/generate`** - Generate embeddings for scraped content
- **Headers (Admin):** `x-api-key`
- **Headers (Client):** `Authorization: Bearer <session_token>`
- **Response:** Initiates background embedding job

**GET `/embeddings/stats`** - Get embeddings generation progress
- **Headers (Admin):** `x-api-key`
- **Headers (Client):** `Authorization: Bearer <session_token>`
- **Query:** `client_id` (optional for admin)
- **Response:** `{ stats: { percentComplete: 0-100, pendingEmbeddings, totalChunks, withEmbeddings } }`

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

### Authentication & Security
- ✅ Supabase authentication setup with email/password provider
- ✅ Session management with automatic token persistence
- ✅ Role-based access control (super_admin, client)
- ✅ Protected route component with role validation
- ✅ Axios interceptors for automatic token attachment
- ✅ Axios interceptors for 401 handling and redirect
- ✅ Public axios instance (separate from authenticated)
- ✅ NoAccess (403) page with context-aware messages
- ✅ Environment-based configuration
- ✅ Memory leak prevention in AuthContext
- ✅ Dynamic user profile display in sidebars

### Admin Dashboard Features
- ✅ Dual dashboard layouts (Super Admin & Client)
- ✅ Login form with professional UI and keyboard support
- ✅ Multi-step client creation wizard (6 steps with subscription config)
- ✅ Domain scraping with real-time progress (max 10 minutes)
- ✅ AI embeddings generation with progress tracking (max 6 minutes)
- ✅ Client management dashboard with CRUD operations
- ✅ View client details with embed script display
- ✅ Rescrape and re-embed functionality for existing clients
- ✅ Real-time progress bar visualization for operations
- ✅ Success/error alerts with user feedback
- ✅ Subscription management system for clients
- ✅ Subscription status updates (active/expired/canceled)
- ✅ Subscription plan management (professional/business/enterprise)
- ✅ Admin support tickets interface with filtering
- ✅ Proper loading state management
- ✅ Centered loading spinner with fixed positioning

### Client Dashboard Features
- ✅ Client dashboard with knowledge base statistics
- ✅ Chatbot configuration interface (colors, position, welcome message)
- ✅ Web scraper management with URL listing
- ✅ Rescrape functionality with auto-embeddings generation
- ✅ Conversations viewer with message thread display
- ✅ Client-side filtering and pagination
- ✅ Quick action shortcuts (My Chatbot, Analytics, etc.)
- ✅ Recent updates and getting started guidance

### UI/UX Enhancements
- ✅ Coming Soon pages for unfinished features with custom icons
- ✅ Admin sidebar navigation with proper menu structure
- ✅ Client sidebar navigation with organized sections
- ✅ Custom scrollbar styling (webkit & Firefox compatible)
- ✅ Improved layout margins and max-width constraints
- ✅ Enhanced visual hierarchy and spacing

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

**Last Updated:** February 9, 2026
**Status:** Production Ready ✅
**Latest Feature Set:** Dashboard Enhancements v2.0
  - Subscription Management System
  - Support Tickets Interface
  - Client Conversation Viewer
  - Chatbot Configuration UI
  - Web Scraper Management
  - Enhanced Layouts & UX
