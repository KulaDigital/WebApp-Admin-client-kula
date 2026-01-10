import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layout/adminLayout/Layout";
import ClientLayout from "./layout/clientLayout/clientLayout";

import Dashboard from "./pages/adminPanel/Dashboard";
import Analytics from "./pages/adminPanel/Analytics";
import Clients from "./pages/adminPanel/Clients";
import Chatbots from "./pages/adminPanel/Chatbot";
import Subscriptions from "./pages/adminPanel/Subscription";
import Usage from "./pages/adminPanel/Usage";
import Integrations from "./pages/adminPanel/Intergrations";
import Settings from "./pages/adminPanel/Settings";
import Security from "./pages/adminPanel/Security";

const App = () => {
  return (
    <Routes>
      {/* Admin Layout */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="clients" element={<Clients />} />
        <Route path="chatbots" element={<Chatbots />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="usage" element={<Usage />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="settings" element={<Settings />} />
        <Route path="security" element={<Security />} />
      </Route>
    </Routes>
  );
};

export default App;
