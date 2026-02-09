import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layout/adminLayout/Layout";
import ClientLayout from "./layout/clientLayout/ClientLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/adminPanel/Dashboard";
import Clients from "./pages/adminPanel/Clients";
import Users from "./pages/adminPanel/Users";
import Subscriptions from "./pages/adminPanel/Subscription";
import Tickets from "./pages/adminPanel/Tickets";
import Analytics from "./pages/adminPanel/Analytics";
import Integrations from "./pages/adminPanel/Intergrations";
import Settings from "./pages/adminPanel/Settings";
import Security from "./pages/adminPanel/Security";
import Login from "./login/Login";
import NoAccess from "./pages/NoAccess";
import ClientDashboard from "./pages/clientPanel/ClientDashboard";
import ChatbotConfiguration from "./pages/clientPanel/ChatbotConfiguration";
import Conversations from "./pages/clientPanel/Conversations";
import WebScraper from "./pages/clientPanel/WebScraper";
import ComingSoon from "./pages/ComingSoon";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/no-access" element={<NoAccess />} />

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Super Admin Routes - Protected with role check */}
        <Route
          path="/SA/*"
          element={
            <ProtectedRoute requiredRole="super_admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<ComingSoon title="Analytics" description="Comprehensive analytics and insights dashboard to track performance metrics." icon="📈" />} />
          <Route path="users" element={<Users />} />
          <Route path="clients" element={<Clients />} />
          <Route path="chatbots" element={<ComingSoon title="Chatbots" description="Manage and configure your AI chatbots with advanced settings." icon="🤖" />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="billing" element={<ComingSoon title="Billing & Revenue" description="Track billing information and revenue metrics." icon="💰" />} />
          <Route path="usage" element={<ComingSoon title="Usage" description="Track usage statistics and resource consumption." icon="📊" />} />
          <Route path="integrations" element={<ComingSoon title="Integrations" description="Connect with third-party tools and services to enhance functionality." icon="🔗" />} />
          <Route path="api-management" element={<ComingSoon title="API Management" description="Manage API keys, endpoints, rate limits, and monitor API usage." icon="🔑" />} />
          <Route path="settings" element={<ComingSoon title="Settings" description="Configure system preferences and advanced options." icon="⚙️" />} />
          <Route path="security" element={<ComingSoon title="Activity Logs & Security" description="Monitor activity logs, security events, and manage access controls." icon="🔒" />} />
          <Route path="support" element={<ComingSoon title="Support Tickets" description="Manage customer support tickets and resolve issues efficiently." icon="🎫" />} />
          <Route path="active-logs" element={<ComingSoon title="Activity Logs" description="Monitor system activity, user actions, and event logs in real-time." icon="📝" />} />
          <Route path="user-feedback" element={<ComingSoon title="User Feedback" description="Collect, review, and manage user feedback to improve your platform." icon="💬" />} />
        </Route>

        {/* Client Dashboard Routes - Protected with role check */}
        <Route
          path="/client/*"
          element={
            <ProtectedRoute requiredRole="client">
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="chatbot" element={<ComingSoon title="My Chatbot" description="View and manage your AI chatbot" icon="🤖" />} />
          <Route path="chatbot-config" element={<ChatbotConfiguration />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="analytics" element={<ComingSoon title="Analytics" description="View your chatbot analytics and performance metrics" icon="📊" />} />
          <Route path="web-scraper" element={<WebScraper />} />
          <Route path="test-chatbot" element={<ComingSoon title="Test Chatbot" description="Test your chatbot in real-time with live conversations" icon="💬" />} />
          <Route path="tickets" element={<ComingSoon title="Support Tickets" description="View your support tickets" icon="🎫" />} />
          <Route path="active-logs" element={<ComingSoon title="Activity Logs" description="View system activity logs" icon="📝" />} />
          <Route path="user-feedback" element={<ComingSoon title="User Feedback" description="View user feedback" icon="💬" />} />
          <Route path="settings" element={<ComingSoon title="Settings" description="Manage your account settings and preferences" icon="⚙️" />} />
          <Route path="api-management" element={<ComingSoon title="API Management" description="Manage your API keys and integration" icon="🔑" />} />
          <Route path="integrations" element={<ComingSoon title="Integrations" description="Connect with third-party tools and services" icon="🔗" />} />
          <Route path="security" element={<ComingSoon title="Security" description="Manage security settings and access controls" icon="🔒" />} />
        </Route>

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
