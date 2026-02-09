import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/instance';
import FormPosition from '../../components/FormPosition';

interface WidgetConfig {
  primaryColor: string;
  secondaryColor: string;
  position: 'bottom-right' | 'bottom-left';
  welcomeMessage: string;
}

interface ClientData {
  id: number;
  company_name: string;
  widget_config: WidgetConfig;
}

const ChatbotConfiguration: React.FC = () => {
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      setLoading(true);
      // First fetch the client me endpoint to get the current client's ID
      const clientMeResponse = await axiosInstance.get('/client/me');
      
      if (clientMeResponse.data.client_id) {
        const id = clientMeResponse.data.client_id;
        setClientId(id);
        
        // Then fetch the client details with widget config
        const clientResponse = await axiosInstance.get(`/admin/clients/${id}`);
        
        if (clientResponse.data.success && clientResponse.data.client.widget_config) {
          setConfig(clientResponse.data.client.widget_config);
        }
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching client data:', err);
      setError('Failed to load widget configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!config) return;
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!config) return;
    setConfig({
      ...config,
      welcomeMessage: e.target.value,
    });
  };

  const handlePositionChange = (position: 'bottom-right' | 'bottom-left') => {
    if (!config) return;
    setConfig({
      ...config,
      position,
    });
  };

  const handleSave = async () => {
    if (!clientId || !config) return;
    
    try {
      setSaving(true);
      setSuccess(false);
      
      const response = await axiosInstance.put(`/api/admin/clients/${clientId}`, {
        widget_config: {
          primaryColor: config.primaryColor,
          secondaryColor: config.secondaryColor,
          position: config.position,
          welcomeMessage: config.welcomeMessage,
        }
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
      setError(null);
    } catch (err) {
      console.error('Error saving configuration:', err);
      setError('Failed to save configuration. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-5 pb-20">
        <div className="text-center py-12">
          <p className="text-text-secondary">Loading configuration...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex flex-col gap-5 pb-20">
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load widget configuration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-5 pb-20">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-text-primary font-heading text-3xl font-bold">
          Chatbot Configuration
        </h1>
        <p className="text-text-secondary font-body text-sm mt-1">
          Customize how your chatbot widget appears on your website
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 mb-5">
          Configuration saved successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-5">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
          {/* Configuration Form */}
          <div className="space-y-6">
            {/* Colors Section */}
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-primary font-heading mb-4">
                Widget Colors
              </h2>
              <div className="space-y-4">
                {/* Primary Color */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="color"
                        name="primaryColor"
                        value={config.primaryColor}
                        onChange={handleColorChange}
                        className="w-full h-12 rounded-lg cursor-pointer border border-[var(--color-border)]"
                      />
                    </div>
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={handleColorChange}
                      name="primaryColor"
                      className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm text-text-primary font-mono"
                      placeholder="#3B82F6"
                    />
                  </div>
                  <p className="text-xs text-text-secondary mt-2">Used for user message bubbles and buttons</p>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="color"
                        name="secondaryColor"
                        value={config.secondaryColor}
                        onChange={handleColorChange}
                        className="w-full h-12 rounded-lg cursor-pointer border border-[var(--color-border)]"
                      />
                    </div>
                    <input
                      type="text"
                      value={config.secondaryColor}
                      onChange={handleColorChange}
                      name="secondaryColor"
                      className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm text-text-primary font-mono"
                      placeholder="#1E40AF"
                    />
                  </div>
                  <p className="text-xs text-text-secondary mt-2">Used for chatbot reply boxes and accents</p>
                </div>
              </div>
            </div>

            {/* Widget Position Section */}
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-primary font-heading mb-4">
                Widget Position
              </h2>
              <div className="flex gap-4">
                <FormPosition 
                  name="Bottom Right"
                  active={config.position === 'bottom-right'}
                  onClick={() => handlePositionChange('bottom-right')}
                />
                <FormPosition 
                  name="Bottom Left"
                  active={config.position === 'bottom-left'}
                  onClick={() => handlePositionChange('bottom-left')}
                />
              </div>
            </div>

            {/* Welcome Message Section */}
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-primary font-heading mb-4">
                Welcome Message
              </h2>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Greeting Message
                </label>
                <textarea
                  value={config.welcomeMessage}
                  onChange={handleMessageChange}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Enter the welcome message visitors will see when opening the chatbot"
                  maxLength={200}
                />
                <p className="text-xs text-text-secondary mt-2">
                  {config.welcomeMessage.length}/200 characters
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ backgroundColor: 'var(--color-primary)' }}
                className="flex-1 px-6 py-3 text-white rounded-lg font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
              <button
                onClick={fetchClientData}
                disabled={saving}
                className="px-6 py-3 text-text-primary border border-[var(--color-border)] rounded-lg font-medium transition-all hover:bg-bg-light disabled:opacity-50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ChatbotConfiguration;
