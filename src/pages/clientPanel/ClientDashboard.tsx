import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/instance';
import StatCard from '../../components/StatCard';
import type { StatCardProps } from '../../types';

interface QuickAction {
  icon: string;
  label: string;
  description: string;
  path: string;
}

const ClientDashboard: React.FC = () => {
  const [stats, setStats] = useState<StatCardProps[]>([]);

  const quickActions: QuickAction[] = [
    { icon: '🤖', label: 'Create Chatbot', description: 'Build a new AI chatbot', path: '/client/chatbot' },
    { icon: '💬', label: 'View Conversations', description: 'Check recent conversations', path: '/client/conversations' },
    { icon: '⚙️', label: 'Configuration', description: 'Adjust chatbot settings', path: '/client/chatbot-config' },
    { icon: '📊', label: 'Analytics', description: 'View performance metrics', path: '/client/analytics' },
  ];

  useEffect(() => {
    fetchClientStats();
  }, []);

  const fetchClientStats = async () => {
    try {
      // Fetch content list (URLs and metadata)
      const contentResponse = await axiosInstance.get('/scraper/content');
      const contentList = contentResponse.data.content || [];
      
      // Fetch chunk statistics (word counts and stats)
      const statsResponse = await axiosInstance.get('/scraper/chunk-stats');
      // Note: chunk-stats returns data directly, not wrapped in 'stats' property
      const statsData = statsResponse.data || {};
      
      // Extract data from responses
      const totalUrls = statsData.totalUrls || contentList.length;
      const totalChunks = statsData.totalChunks || 0;
      const totalWords = statsData.totalWords || 0;
      const averageWordsPerChunk = statsData.averageWordsPerChunk || 0;
      const averageChunksPerUrl = statsData.averageChunksPerUrl || 0;
      
      // Build stats for display - knowledge base focused metrics
      setStats([
        {
          icon: '🕷️',
          label: 'Scraped URLs',
          value: totalUrls.toString(),
          change: totalChunks > 0 ? `${totalChunks} chunks indexed` : 'No content indexed',
          changeType: totalUrls > 0 ? 'positive' : 'negative',
          iconColor: 'purple',
        },
        {
          icon: '📄',
          label: 'Total Chunks',
          value: totalChunks.toString(),
          change: `${averageChunksPerUrl?.toFixed(1) || '0'} avg per URL`,
          changeType: totalChunks > 0 ? 'positive' : 'negative',
          iconColor: 'blue',
        },
        {
          icon: '📚',
          label: 'Total Words',
          value: totalWords >= 1000 ? `${(totalWords / 1000).toFixed(1)}K` : totalWords.toString(),
          change: `${averageWordsPerChunk?.toFixed(0) || '0'} avg per chunk`,
          changeType: totalWords > 0 ? 'positive' : 'negative',
          iconColor: 'orange',
        },
        {
          icon: '⚡',
          label: 'Knowledge Base',
          value: totalUrls > 0 ? '✓' : '○',
          change: totalUrls > 0 ? 'Ready to use' : 'Add content',
          changeType: totalUrls > 0 ? 'positive' : 'negative',
          iconColor: 'green',
        },
      ]);
    } catch (err) {
      // Handle errors with proper typing
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { status: number; data?: { error: string } } };
        if (error.response?.status === 403) {
          console.warn('Access denied to scraper data:', error.response.data?.error);
        }
      } else {
        console.error('Error fetching client stats:', err);
      }
      // Show fallback stats for any error
      setStats(getFallbackStats());
    }
  };

  const getFallbackStats = (): StatCardProps[] => [
    { icon: '🕷️', label: 'Scraped URLs', value: '0', change: 'No content indexed', changeType: 'negative', iconColor: 'purple' },
    { icon: '📄', label: 'Total Chunks', value: '0', change: '0 avg per URL', changeType: 'negative', iconColor: 'blue' },
    { icon: '📚', label: 'Total Words', value: '0', change: '0 avg per chunk', changeType: 'negative', iconColor: 'orange' },
    { icon: '⚡', label: 'Knowledge Base', value: '○', change: 'Add content', changeType: 'negative', iconColor: 'green' },
  ];

  return (
    <div className="flex flex-col gap-5 pb-20">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-text-primary font-heading text-3xl font-bold">
          Welcome Back!
        </h1>
        <p className="text-text-secondary font-body text-sm mt-1">
          Here's an overview of your chatbot performance and usage.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.length > 0 ? stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        )) : getFallbackStats().map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-text-primary font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              onClick={() => window.location.href = action.path}
              className="bg-white border border-[var(--color-border)] rounded-lg p-6 hover:shadow-md hover:border-[var(--color-primary)] transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{action.icon}</div>
              <h3 className="font-bold text-text-primary mb-1">{action.label}</h3>
              <p className="text-sm text-text-secondary">{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates Card */}
      <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h3 className="text-xl font-bold text-text-primary font-heading">
            Recent Updates
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-2xl">ℹ️</span>
              <div>
                <p className="font-semibold text-text-primary">Getting Started</p>
                <p className="text-sm text-text-secondary mt-1">Create your first chatbot and configure it to handle customer inquiries.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-text-primary">Monitor Performance</p>
                <p className="text-sm text-text-secondary mt-1">Track conversations and analytics to optimize your chatbot's responses.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-2xl">🔗</span>
              <div>
                <p className="font-semibold text-text-primary">Integrate & Deploy</p>
                <p className="text-sm text-text-secondary mt-1">Connect your chatbot to your website or application using our APIs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
