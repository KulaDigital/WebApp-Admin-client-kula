import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layout/adminLayout/Layout";
import ClientLayout from "./layout/clientLayout/ClientLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/adminPanel/Dashboard";
import Analytics from "./pages/adminPanel/Analytics";
import Clients from "./pages/adminPanel/Clients";
import Users from "./pages/adminPanel/Users";
import Chatbots from "./pages/adminPanel/Chatbot";
import Subscriptions from "./pages/adminPanel/Subscription";
import Usage from "./pages/adminPanel/Usage";
import Integrations from "./pages/adminPanel/Intergrations";
import Settings from "./pages/adminPanel/Settings";
import Security from "./pages/adminPanel/Security";
import Login from "./login/Login";
import NoAccess from "./pages/NoAccess";
import ClientDashboard from "./pages/clientPanel/ClientDashboard";
import Support from "./pages/adminPanel/Support";
import Billing from "./pages/adminPanel/Billing";
import AddClient from "./pages/adminPanel/AddClient";
import Chatbot from "./pages/adminPanel/Chatbot";

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
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="clients" element={<Clients />} />
          <Route path="chatbots" element={<Chatbots />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="usage" element={<Usage />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="settings" element={<Settings />} />
          <Route path="security" element={<Security />} />
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
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="security" element={<Security />} />
        </Route>

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
