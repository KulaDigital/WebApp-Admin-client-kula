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

### API Layer & Integration
- ✅ Centralized API layer with organized endpoint groups (`src/api/index.ts`) ⭐ NEW
- ✅ Comprehensive documentation for all API endpoints
- ✅ Consistent error handling and response formats
- ✅ Batch/utility endpoints for optimized data fetching

### Admin Panel
- ✅ Dashboard with key metrics and overview
- ✅ Multi-step client creation wizard with subscriptions
- ✅ Subscription management (status, plan, period updates)
- ✅ Support ticket management with filtering
- ✅ Client rescraping and re-embedding
- ✅ Professional navigation menu with organized sections

### Client Portal
- ✅ Dashboard with knowledge base statistics & subscription display ⭐ ENHANCED
- ✅ Chatbot widget configuration with embed script & integration guide ⭐ ENHANCED
- ✅ Web scraper management with rescraping
- ✅ Conversation history viewer with pagination
- ✅ Quick action shortcuts for common tasks
- ✅ **Leads Management** - Capture and track chatbot-generated leads ⭐ NEW
  - Search and filter leads by status (new, contacted, qualified, won, lost)
  - Real-time lead status updates
  - Pagination for large lead lists
  - Contact information management (name, email, phone, company)
- ✅ Dynamic subscription badge showing plan and trial status

### UI/UX
- ✅ **Icon System** - SVG-based reusable Icon component ⭐ NEW
  - Semantic icon names (chatbot, analytics, settings, etc.)
  - Configurable sizes (xs, sm, md, lg, xl, 2xl)
  - Accessibility support with aria labels
  - Replaces emoji usage throughout the app
- ✅ Dynamic Coming Soon pages with custom icons
- ✅ Custom scrollbar styling (Chrome & Firefox)
- ✅ Improved layout spacing and max-width constraints
- ✅ Professional loading states and spinners
- ✅ Access denied (403) handling with context
- ✅ Glassmorphic design with TailwindCSS and Material-UI
- ✅ Enhanced color palette with secondary colors and warning-light

## 🏗️ Project Structure

```
src/
├── api/                        # ⭐ NEW: Centralized API layer with organized endpoints
│   └── index.ts                # Authentication, Client, Admin, Public API endpoints
├── components/
│   ├── Icon.tsx                # ⭐ NEW: SVG-based reusable icon component
│   ├── Button.tsx              # Reusable button component (enhanced with CSS vars)
│   ├── Drawer.tsx              # Drawer component
│   ├── ProtectedRoute.tsx       # Route guard with role validation
│   ├── StatCard.tsx            # Statistics card component (uses Icon)
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
│   └── AuthContext.tsx         # Authentication provider (uses centralized API)
├── layout/
│   ├── adminLayout/
│   │   ├── Layout.tsx          # Admin dashboard layout
│   │   ├── Sidebar.tsx         # Admin sidebar with organized menu
│   │   ├── SidebarMenu.tsx     # Admin navigation menu items (uses semantic icons)
│   │   └── TopBar.tsx          # Admin top navigation
│   └── clientLayout/
│       ├── ClientLayout.tsx    # Client dashboard layout
│       ├── ClientHeder.tsx     # Client header
│       └── ClientSidebar.tsx   # Client sidebar with subscription badge & dynamic menu
├── login/
│   └── Login.tsx               # Email/password login form (uses Icon component)
├── pages/
│   ├── ComingSoon.tsx          # Coming Soon component (uses Icon component)
│   ├── adminPanel/
│   │   ├── Dashboard.tsx       # (uses Icon component for stats)
│   │   ├── Analytics.tsx       # (uses Icon component for stats)
│   │   ├── Clients.tsx         # (uses centralized API)
│   │   ├── Users.tsx           # (uses centralized API)
│   │   ├── Subscription.tsx    # Subscription management
│   │   ├── Tickets.tsx         # Support tickets listing
│   │   ├── Settings.tsx        # Platform settings
│   │   ├── Security.tsx        # Security settings
│   │   ├── Intergrations.tsx   # (uses Icon component)
│   │   ├── Chatbot.tsx         # (uses Icon component for stats)
│   │   ├── Billing.tsx         # Billing Coming Soon
│   │   ├── Usage.tsx           # Usage Coming Soon (uses Icon component)
│   │   └── AddClient.tsx       # Client creation wizard
│   ├── clientPanel/
│   │   ├── ClientDashboard.tsx # Dashboard with stats & subscription display ⭐ ENHANCED
│   │   ├── ChatbotConfiguration.tsx  # Widget config with embed script & guide ⭐ ENHANCED
│   │   ├── Conversations.tsx   # Conversation viewer
│   │   ├── WebScraper.tsx      # URL management
│   │   ├── Leads.tsx           # ⭐ NEW: Leads management & tracking
│   │   └── Tickets.tsx         # Support tickets Coming Soon
│   └── NoAccess.tsx            # 403 error page
├── utils/
│   ├── supabase.ts             # Supabase client initialization
│   ├── instance.ts             # Authenticated axios instance
│   ├── publicInstance.ts       # Public axios instance
│   ├── subscriptionApi.ts      # Subscription utilities
│   ├── cssVariables.ts         # CSS variable getters
│   └── API_CLIENTS_GUIDE.ts    # API client usage documentation
├── App.tsx                     # Main app with routing (uses centralized API)
├── App.css                     # Global styles with enhanced color palette
├── types.tsx                   # TypeScript interfaces
├── main.tsx                    # React entry point
├── tailwind.config.ts          # TailwindCSS configuration
└── index.html                  # HTML template
```


### Key Dashboard Enhancements (Latest)

**🎉 NEW: Icon System Component** ⭐
- SVG-based reusable `Icon` component in `src/components/Icon.tsx`
- Semantic icon names replacing all emojis (chatbot, analytics, settings, etc.)
- Configurable sizes: xs, sm, md, lg, xl, 2xl
- Accessibility support with aria labels and decorative flag
- 50+ built-in icons mapped to common application functions
- Easy to extend with new icons
- All existing components migrated to use Icon component

**🎉 NEW: Centralized API Layer** ⭐
- New `src/api/index.ts` with organized endpoint groups
- Clean separation of concerns: Auth, Client, Admin, Public APIs
- Comprehensive JSDoc documentation for each endpoint
- Batch endpoints for optimized data fetching
- Used throughout the app for consistent API access
- AuthContext updated to use centralized API

**🎉 NEW: Leads Management Page** ⭐
- New client portal page: `/client/leads`
- **Features:**
  - View all captured leads from chatbot conversations
  - Search leads by name, email, or company
  - Filter by status: New, Contacted, Qualified, Won, Lost
  - Real-time status updates with dropdown selection
  - Contact information display (email, phone, company)
  - Pagination for large lead lists
  - Lead creation timestamp tracking
  - Responsive table design
- **Stats Cards:** Total leads, New, Qualified, Won breakdown
- **Error Handling:** 403 access control, 404 handling, graceful fallbacks
- **API Integration:** Uses centralized API layer

**🎉 ENHANCED: ChatbotConfiguration Page** ⭐
- Added embed script display and copy functionality
- New integration guide modal with step-by-step instructions
- **Features:**
  - Copy-to-clipboard button for embed script
  - Integration documentation modal
  - Example HTML implementation
  - Domain placement recommendations
  - HTTPS/HTTP guidance
  - Important notes and warnings
  - Support contact information
- Extracted embed data from client response for display

**🎉 ENHANCED: ClientDashboard** ⭐
- Added subscription information display
- **Features:**
  - Subscription plan badge (Professional, Business, Enterprise)
  - Trial status indicator
  - Billing period information
  - Renewal date display
  - Color-coded plan badges
  - Subscription status tracking
- Refactored to use batch API endpoint for optimized data fetching
- Uses `fetchScraperData()` utility for parallel requests

**🎉 ENHANCED: ClientSidebar** ⭐
- Dynamic subscription badge showing plan name and trial status
- Refactored navigation structure into 4 sections: MAIN, MANAGE, SUPPORT, SYSTEM
- **Features:**
  - Added "Leads" menu item in MANAGE section
  - Plan-specific color coding for badges
  - Real-time subscription data fetching on mount
  - Graceful fallback for loading state
  - Short plan names display (PRO, BIZ, ENT)
- Uses centralized API layer (`clientApi.getClientProfile()`)

**🎨 ENHANCED: Color Palette** ⭐
- New CSS variables added to `App.css`:
  - `--color-secondary-hover: #062d5c` - Secondary button hover state
  - `--color-secondary-light: rgba(10, 37, 64, 0.1)` - Secondary light variant
  - `--color-warning-light: rgba(245, 158, 11, 0.1)` - Warning light background
- All components updated to use CSS variables for consistency
- Button component uses new secondary color variables
- Warning alerts use new warning-light color

**📦 Icon Replacements Throughout App**
- **Admin Routes:** Dashboard (📊 → dashboard), Analytics (📈 → analytics), etc.
- **StatCard Component:** All stat cards now use semantic icon names
- **ComingSoon Pages:** All coming soon icons replaced with semantic names
- **Login Form:** Chat emoji (💬) replaced with Icon component
- **Integrations Page:** All integration icons updated
- **Navigation Menus:** Sidebar icons all converted to semantic names
- **Usage Page:** Added icon support for API calls, storage, bandwidth

**New Coming Soon Icon Names:**
- analytics, chatbot, billing, stats, integrations, keys, settings, security, support, logs, feedback, chat, search, trending, people, card, link, api, storage

**Layout & Navigation Updates**
- Client Sidebar menu reorganized: MAIN, MANAGE, SUPPORT, SYSTEM (was: MAIN, TRAINING, SUPPORT, SYSTEM)
- Added "Leads" to MANAGE section of client menu
- Admin menu updated with consistent icon usage
- Improved visual hierarchy with semantic icons

**API Integration Layer Changes**
- AuthContext refactored to use `authApi.getMe()` from centralized layer
- Clients page uses `adminClientsApi` functions
- Users page uses `adminUsersApi` functions
- Dashboard components use centralized API
- Removed direct axios calls in favor of API layer functions

**New Coming Soon Features** 
- All admin routes now properly integrated with ComingSoon pages
- All client routes now properly integrated with ComingSoon pages
- Consistent icon usage across all coming soon pages

**Bug Fixes & Code Quality**
- Fixed case sensitivity in client layout imports (ClientSidebar, ClientHeder)
- Removed unused imports in various components
- Improved error handling with try-catch blocks
- Better type safety with TypeScript interfaces
- Replaced unused loop variables with underscore naming convention


### Key Files

⭐ **Critical for Auth System:**
- `src/context/AuthContext.tsx` - Central authentication provider managing session, role, and loading states
- `src/components/ProtectedRoute.tsx` - Route guard enforcing authentication and role validation
- `src/login/Login.tsx` - Login form with Supabase auth
- `src/utils/supabase.ts` - Supabase client singleton
- `src/utils/instance.ts` - Authenticated HTTP client with token attachment and 401 handling
- `src/pages/NoAccess.tsx` - Access denied page with context-aware messaging

⭐ **NEW API & Integration:**
- `src/api/index.ts` - **Centralized API layer with 5 endpoint groups** ⭐ NEW
  - authApi (authentication endpoints)
  - clientApi (client data & scraper endpoints)
  - adminClientsApi (client management endpoints)
  - adminUsersApi (user management endpoints)
  - adminSupportApi (support endpoints)
  - publicApi (public endpoints)

⭐ **NEW UI Components:**
- `src/components/Icon.tsx` - **SVG-based reusable icon system** ⭐ NEW

⭐ **Dashboard Features:**
- `src/pages/ComingSoon.tsx` - Coming Soon component with Icon support
- `src/utils/subscriptionApi.ts` - Subscription management utilities
- `src/pages/adminPanel/Subscription.tsx` - Admin subscription management interface
- `src/pages/adminPanel/Tickets.tsx` - Support tickets listing and filtering
- `src/pages/clientPanel/ChatbotConfiguration.tsx` - Widget customization with embed script guide
- `src/pages/clientPanel/WebScraper.tsx` - URL and scraping management
- `src/pages/clientPanel/Conversations.tsx` - Conversation viewer with pagination
- `src/pages/clientPanel/Leads.tsx` - **Lead management page** ⭐ NEW
- `src/layout/clientLayout/ClientSidebar.tsx` - Client sidebar with subscription badge
- `src/layout/clientLayout/ClientLayout.tsx` - Client layout
- `src/pages/clientPanel/ClientDashboard.tsx` - Client dashboard with subscription display

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

### API Layer & Integration ⭐
- ✅ Centralized API layer (`src/api/index.ts`) with organized endpoint groups
- ✅ Authentication endpoints (getMe)
- ✅ Client API endpoints (profile, conversations, scraper data, leads)
- ✅ Admin client management endpoints (CRUD operations)
- ✅ Admin user management endpoints (CRUD operations)
- ✅ Admin support endpoints (tickets, etc.)
- ✅ Public API endpoints (client creation)
- ✅ Batch utility endpoints (fetchScraperData)
- ✅ Comprehensive JSDoc documentation for all endpoints

### Icon System ⭐
- ✅ SVG-based reusable Icon component with 50+ icons
- ✅ Semantic icon names replacing all emojis
- ✅ Configurable sizes (xs, sm, md, lg, xl, 2xl)
- ✅ Accessibility support (aria-hidden, aria-label)
- ✅ Migration of all existing components to use Icon
- ✅ StatCard component using Icon
- ✅ ComingSoon pages using Icon
- ✅ Login form using Icon
- ✅ Navigation menus using Icon
- ✅ Admin and client dashboards using Icon

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
- ✅ Client dashboard with subscription display ⭐ NEW
- ✅ Chatbot configuration interface (colors, position, welcome message)
- ✅ Chatbot configuration with embed script display ⭐ NEW
- ✅ Chatbot configuration with integration guide modal ⭐ NEW
- ✅ Web scraper management with URL listing
- ✅ Rescrape functionality with auto-embeddings generation
- ✅ Conversations viewer with message thread display
- ✅ Client-side filtering and pagination
- ✅ Quick action shortcuts (My Chatbot, Analytics, etc.)
- ✅ Recent updates and getting started guidance
- ✅ **Leads Management Page** ⭐ NEW
  - Search and filter leads by status
  - Real-time status updates
  - Contact information management
  - Pagination for large lead lists
  - Stats overview (total, new, qualified, won)

### UI/UX Enhancements
- ✅ Icon System component replacing all emojis
- ✅ Coming Soon pages for unfinished features
- ✅ Admin sidebar navigation with proper menu structure
- ✅ Client sidebar navigation with organized sections
- ✅ Client sidebar with dynamic subscription badge ⭐ NEW
- ✅ Enhanced color palette with CSS variables ⭐ NEW
  - Secondary hover color
  - Secondary light color
  - Warning light color
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

### Using the Centralized API Layer

```typescript
import { 
  authApi, 
  clientApi, 
  adminClientsApi, 
  adminUsersApi,
  publicApi,
  fetchScraperData 
} from '@/api';

// Get current user
const userRole = await authApi.getMe();

// Get client profile
const profile = await clientApi.getClientProfile();

// Get client conversations
const conversations = await clientApi.getConversations();

// Get leads
const leads = await clientApi.getLeads('/leads?limit=20');

// Get client by status (admin only)
const activeClients = await adminClientsApi.getClientsByStatus('active');

// Update client
await adminClientsApi.updateClient(clientId, { company_name: 'New Name' });

// Create user (admin only)
await adminUsersApi.createUser({
  supabaseUserId: 'uuid',
  userName: 'John Doe',
  role: 'client',
  clientName: 'Acme Corp'
});

// Batch fetch for optimization
const { content, stats } = await fetchScraperData();
```

### Using the Icon Component

```typescript
import Icon from '@/components/Icon';

// Decorative icon (default)
<Icon name="chatbot" size="lg" decorative />

// Accessible icon with label
<Icon name="settings" ariaLabel="Settings" title="Open Settings" />

// With custom className
<Icon name="analytics" size="md" className="text-blue-500" />

// Available icon names:
// Navigation: dashboard, search, menu, chevronDown, chevronRight
// Data: analytics, stats, trending, api, storage
// Communication: chat, message, feedback
// User: users, people
// Business: chatbot, billing, card, subscription, money
// System: settings, cog, security, lock, logs, activity
// Integration: integrations, link, keys
// Actions: check, close, plus, trash, edit, download, copy, arrowRight
```

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

**Last Updated:** February 15, 2026
**Status:** Production Ready ✅
**Latest Feature Set:** Dashboard Enhancements v3.0 ⭐
  - **Icon System** - SVG-based reusable component (50+ icons)
  - **Centralized API Layer** - Organized endpoint groups
  - **Leads Management** - Full lead tracking and management
  - **Enhanced ChatbotConfiguration** - Embed script guide
  - **Enhanced ClientDashboard** - Subscription display
  - **Enhanced ClientSidebar** - Dynamic subscription badge
  - **Color Palette Enhancements** - New CSS variables
