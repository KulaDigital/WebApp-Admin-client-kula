import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientApi } from '../../api';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/instance';
import StatCard from '../../components/StatCard';
import Icon from '../../components/Icon';
import { useNotification } from '../../components/Notification';
import type { StatCardProps } from '../../types';

interface Conversation {
  id: string | number;
  visitor_id?: string;
  status?: string;
  message_count?: number;
  last_activity?: string;
  updated_at?: string;
  created_at?: string;
}

interface PaginatedResponse<T> {
  data?: T[];
  conversations?: T[];
  pagination?: {
    total_count?: number;
    total?: number;
  };
}

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const { showNotification, NotificationComponent } = useNotification();
  const [stats, setStats] = useState<StatCardProps[]>([]);
  const [recentConversations, setRecentConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewLoading, setPreviewLoading] = useState(false);

  const userName = userRole?.userName || 'User';

  const extractScriptUrl = (embedScript: string): string => {
    const match = embedScript.match(/src="([^"]+)"/);
    return match ? match[1] : `${import.meta.env.VITE_API_BASE_URL}/widget.js`;
  };

  const openWidgetPreview = (apiKey: string, scriptUrl: string) => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Widget Preview</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .preview-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
      padding: 20px;
      max-width: 600px;
      width: 100%;
    }
    .preview-header {
      border-bottom: 2px solid #f3f4f6;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
    .preview-header h1 {
      margin: 0;
      font-size: 18px;
      color: #1f2937;
    }
    .preview-header p {
      margin: 5px 0 0 0;
      font-size: 14px;
      color: #6b7280;
    }
    .preview-info {
      background: #f0f9ff;
      border-left: 4px solid #3b82f6;
      padding: 12px;
      margin-bottom: 15px;
      border-radius: 4px;
      font-size: 12px;
      color: #1e40af;
    }
    .preview-note {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px;
      margin-bottom: 15px;
      border-radius: 4px;
      font-size: 12px;
      color: #92400e;
    }
    .widget-container {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 15px;
      background: #f9fafb;
      min-height: 300px;
    }
  </style>
</head>
<body>
  <div class="preview-container">
    <div class="preview-header">
      <h1>Chat Widget Preview</h1>
      <p>Testing your chatbot widget configuration</p>
    </div>
    
    <div class="preview-info">
      ℹ️ This is a preview of your chat widget. Messages are <strong>disabled in preview mode</strong> for testing purposes.
    </div>
    
    <div class="preview-note">
      ⚠️ This tab is for previewing only. Close it when done testing.
    </div>

    <div class="widget-container">
      <!-- Chat Widget will be injected here -->
    </div>
  </div>
  
  <script src="${scriptUrl}" data-api-key="${apiKey}" data-preview-mode="true"><\/script>
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleOpenPreview = async () => {
    setPreviewLoading(true);

    try {
      let clientId = userRole?.clientId;

      if (!clientId) {
        try {
          const meResponse = await axiosInstance.get('/me');
          clientId = meResponse.data.client_id;
        } catch (meError) {
          console.error('Error fetching user info:', meError);
          showNotification('Failed to retrieve client information', 'error');
          setPreviewLoading(false);
          return;
        }
      }

      if (!clientId) {
        showNotification('Client ID not found', 'error');
        setPreviewLoading(false);
        return;
      }

      try {
        const clientResponse = await axiosInstance.get(`/admin/clients/${clientId}`);
        const clientData = clientResponse.data.client || clientResponse.data;
        const { api_key, embed_script } = clientData;

        if (!api_key) {
          showNotification('API key not configured', 'error');
          setPreviewLoading(false);
          return;
        }

        const scriptUrl = embed_script ? extractScriptUrl(embed_script) : `${import.meta.env.VITE_API_BASE_URL}/widget.js`;
        openWidgetPreview(api_key, scriptUrl);
        showNotification('Widget preview opened in a new tab', 'success');
      } catch (clientError: any) {
        console.error('Error fetching client data:', clientError);
        const errorMessage = clientError?.response?.data?.message || 'Failed to fetch client configuration';
        showNotification(errorMessage, 'error');
      }
    } catch (generalError: any) {
      console.error('Unexpected error:', generalError);
      showNotification('An unexpected error occurred', 'error');
    } finally {
      setPreviewLoading(false);
    }
  };

  const quickActions = [
    { icon: 'chat', label: 'View All Conversations', description: 'Browse all chatbot conversations', path: '/client/conversations' },
    { icon: 'users', label: 'Manage Leads', description: 'View and manage captured leads', path: '/client/leads' },
    { icon: 'chatbot', label: 'Test Chatbot', description: 'Test your chatbot live', path: '/client/test-chatbot' },
    { icon: 'analytics', label: 'View Analytics', description: 'View performance metrics', path: '/client/analytics' },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const profileRes = await clientApi.getClientProfile();
      const clientId = profileRes.client_id || (profileRes as any).id;

      const [convRes, activeConvRes, leadsRes] = await Promise.allSettled([
        clientApi.getConversations({ limit: 5, sort: 'recent' }),
        clientApi.getConversations({ status: 'active', limit: 1 }),
        clientId ? clientApi.getClientLeads(clientId, { limit: 1 }) : Promise.resolve(null),
      ]);

      // Extract total conversations
      const convData = convRes.status === 'fulfilled' ? convRes.value as PaginatedResponse<Conversation> : null;
      const totalConversations = convData?.pagination?.total_count ?? convData?.pagination?.total ?? 0;
      const conversations = convData?.conversations ?? convData?.data ?? [];
      setRecentConversations(conversations.slice(0, 5));

      // Extract active conversations count
      const activeData = activeConvRes.status === 'fulfilled' ? activeConvRes.value as PaginatedResponse<Conversation> : null;
      const activeCount = activeData?.pagination?.total_count ?? activeData?.pagination?.total ?? 0;

      // Extract leads count
      const leadsData = leadsRes.status === 'fulfilled' ? leadsRes.value : null;
      const totalLeads = leadsData?.total ?? leadsData?.pagination?.total ?? leadsData?.pagination?.total_count ?? 0;

      // Extract subscription
      const sub = profileRes?.subscription;

      // Calculate trial days remaining
      let subChange = sub?.status === 'active' ? 'Active' : (sub?.status || 'N/A');
      if (sub?.is_trial && sub?.ends_at) {
        const daysLeft = Math.max(0, Math.ceil((new Date(sub.ends_at).getTime() - Date.now()) / 86400000));
        subChange = `${daysLeft} days remaining`;
      }

      setStats([
        {
          icon: 'chat',
          label: 'Total Conversations',
          value: totalConversations.toString(),
          change: totalConversations > 0 ? `${totalConversations} total` : 'No conversations yet',
          changeType: totalConversations > 0 ? 'positive' : 'negative',
          iconColor: 'blue',
        },
        {
          icon: 'live',
          label: 'Active Conversations',
          value: activeCount.toString(),
          change: activeCount > 0 ? `${activeCount} ongoing` : 'None active',
          changeType: activeCount > 0 ? 'positive' : 'negative',
          iconColor: 'green',
        },
        {
          icon: 'users',
          label: 'Total Leads',
          value: totalLeads.toString(),
          change: totalLeads > 0 ? `${totalLeads} captured` : 'No leads yet',
          changeType: totalLeads > 0 ? 'positive' : 'negative',
          iconColor: 'purple',
        },
        {
          icon: 'star',
          label: 'Subscription Plan',
          value: formatSubscriptionPlan(sub?.plan, sub?.is_trial),
          change: subChange,
          changeType: sub?.status === 'active' ? 'positive' : 'negative',
          iconColor: 'orange',
        },
      ]);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setStats(getFallbackStats());
    } finally {
      setLoading(false);
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const formatSubscriptionPlan = (plan: string | undefined, isTrial: boolean | undefined): string => {
    if (isTrial) return 'Trial';
    
    if (!plan) return 'N/A';
    
    const planLower = plan.toLowerCase();
    switch (planLower) {
      case 'starter':
        return 'Starter';
      case 'professional':
        return 'Pro';
      case 'business':
        return 'Business';
      case 'enterprise':
        return 'Enterprise';
      default:
        return capitalize(plan);
    }
  };

  const getFallbackStats = (): StatCardProps[] => [
    { icon: 'chat', label: 'Total Conversations', value: '—', change: 'Unable to load', changeType: 'negative', iconColor: 'blue' },
    { icon: 'live', label: 'Active Conversations', value: '—', change: 'Unable to load', changeType: 'negative', iconColor: 'green' },
    { icon: 'users', label: 'Total Leads', value: '—', change: 'Unable to load', changeType: 'negative', iconColor: 'purple' },
    { icon: 'star', label: 'Subscription Plan', value: 'N/A', change: 'Unable to load', changeType: 'negative', iconColor: 'orange' },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'badge badge-success';
      case 'closed':
      case 'ended':
        return 'badge badge-error';
      default:
        return 'badge badge-info';
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Welcome Header */}
      <div className="page-header">
        <h1>Welcome back, {userName}!</h1>
        <p>{currentDate}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.length > 0
          ? stats.map((stat, i) => <StatCard key={i} {...stat} />)
          : getFallbackStats().map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* Recent Conversations Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-h3 text-[var(--color-text-primary)]">Recent Conversations</h3>
          <button
            className="btn btn-outline text-small"
            onClick={() => navigate('/client/conversations')}
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)' }}>
                <th className="table-header-cell">Visitor ID</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Messages</th>
                <th className="table-header-cell">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="table-cell text-center text-[var(--color-text-secondary)]">
                    Loading...
                  </td>
                </tr>
              ) : recentConversations.length > 0 ? (
                recentConversations.map((conv) => (
                  <tr key={conv.id} className="table-row border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="table-cell text-small font-medium text-[var(--color-text-primary)]">
                      {conv.visitor_id || `#${conv.id}`}
                    </td>
                    <td className="table-cell">
                      <span className={getStatusBadge(conv.status)}>
                        {conv.status ? capitalize(conv.status) : 'Unknown'}
                      </span>
                    </td>
                    <td className="table-cell text-small text-[var(--color-text-secondary)]">
                      {conv.message_count ?? '—'}
                    </td>
                    <td className="table-cell text-small text-[var(--color-text-secondary)]">
                      {formatDate(conv.last_activity || conv.updated_at || conv.created_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="table-cell text-center text-[var(--color-text-secondary)] py-8">
                    No conversations yet. Start by testing your chatbot!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-h2 text-[var(--color-text-primary)] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Widget Preview Card */}
          <div
            onClick={handleOpenPreview}
            className={`card p-5 cursor-pointer group hover:shadow-lg transition-all ${
              previewLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110"
              style={{
                background: 'var(--color-primary-light)',
                transition: 'transform var(--transition-base)',
              }}
            >
              <Icon name="chatbot" size="md" decorative />
            </div>
            <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">Preview Chat Widget</h3>
            <p className="text-xs text-[var(--color-text-secondary)]">See how your widget appears on your website</p>
          </div>

          {/* Navigation Actions */}
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={() => navigate(action.path)}
              className="card p-5 cursor-pointer group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110"
                style={{
                  background: 'var(--color-primary-light)',
                  transition: 'transform var(--transition-base)',
                }}
              >
                <Icon name={action.icon} size="md" decorative />
              </div>
              <h3 className="font-bold text-[var(--color-text-primary)] text-sm mb-1">{action.label}</h3>
              <p className="text-xs text-[var(--color-text-secondary)]">{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notification component */}
      {NotificationComponent}
    </div>
  );
};

export default ClientDashboard;
