import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/instance';
import { useNotification } from './Notification';

interface WidgetPreviewButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  buttonLabel?: string;
}

const WidgetPreviewButton: React.FC<WidgetPreviewButtonProps> = ({
  className = '',
  variant = 'primary',
  size = 'md',
  buttonLabel = 'Preview Chat Widget',
}) => {
  const { userRole } = useAuth();
  const { showNotification, NotificationComponent } = useNotification();

  const [isLoading, setIsLoading] = useState(false);

  const extractScriptUrl = (embedScript: string): string => {
    // Extract src URL from embed script
    // Example: <script src="http://localhost:3000/widget.js" data-api-key="..."></script>
    const match = embedScript.match(/src="([^"]+)"/);
    const url = match ? match[1] : `${import.meta.env.VITE_API_BASE_URL}/widget.js`;
    
    // Fallback to production URL if localhost fails (for development purposes)
    if (url.includes('localhost:3000')) {
      console.warn('Widget server on localhost:3000 may not be ready. Consider using production URL or ensuring widget.js is in public folder.');
    }
    
    return url;
  };

  const openWidgetPreview = (apiKey: string, scriptUrl: string) => {
    // Create HTML content with widget script
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
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }
    h1 {
      color: #333;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .subtitle {
      color: #666;
      font-size: 14px;
      margin-bottom: 30px;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    .badge {
      display: inline-block;
      background: #DBEAFE;
      color: #0C4A6E;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">✅ Chat Widget Preview</div>
    <h1>Welcome to Your Website</h1>
    <p class="subtitle">Chat widget is now live on this page</p>
    <p>The Greeto chat widget has been successfully injected into this page. Look for the chat widget in the bottom-right corner of your screen.</p>
    <p>This preview demonstrates how the widget will appear on your actual website. You can:</p>
    <ul>
      <li>Click the widget to test the chat interface</li>
      <li>Interact with the chatbot</li>
      <li>Verify the positioning and styling</li>
    </ul>
    <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #999; font-size: 12px;">
      Widget API Key: <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${apiKey}</code>
    </p>
  </div>
  
  <!-- Greeto Chat Widget Script (Preview Mode - Message Sending Disabled) -->
  <script src="${scriptUrl}" data-api-key="${apiKey}" data-preview-mode="true"></script>
</body>
</html>
    `.trim();

    // Create a blob and open in new tab
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handlePreviewClick = async () => {
    setIsLoading(true);

    try {
      // Step 1: Get current user's client_id
      let clientId = userRole?.clientId;

      if (!clientId) {
        // Fallback: Call GET /api/me to get client_id
        try {
          const meResponse = await axiosInstance.get('/me');
          clientId = meResponse.data.client_id;
        } catch (meError) {
          console.error('Error fetching user info:', meError);
          showNotification('Failed to retrieve client information', 'error');
          setIsLoading(false);
          return;
        }
      }

      if (!clientId) {
        showNotification('Client ID not found', 'error');
        setIsLoading(false);
        return;
      }

      // Step 2: Fetch client details including api_key
      try {
        const clientResponse = await axiosInstance.get(`/admin/clients/${clientId}`);
        const clientData = clientResponse.data.client || clientResponse.data;
        const { api_key, embed_script } = clientData;

        // Validate required fields
        if (!api_key) {
          showNotification('API key not configured', 'error');
          setIsLoading(false);
          return;
        }

        // Extract widget script URL from embed_script
        const scriptUrl = embed_script ? extractScriptUrl(embed_script) : `${import.meta.env.VITE_API_BASE_URL}/widget.js`;

        // Open preview in new tab
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
      setIsLoading(false);
    }
  };

  // Determine button styling based on variant and size
  const baseClasses =
    variant === 'primary'
      ? 'bg-[var(--color-primary)] text-white hover:opacity-90'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  const sizeClasses =
    size === 'sm'
      ? 'px-3 py-1.5 text-sm'
      : size === 'lg'
        ? 'px-6 py-3 text-base'
        : 'px-4 py-2 text-sm';

  return (
    <>
      <button
        onClick={handlePreviewClick}
        disabled={isLoading}
        className={`
          ${baseClasses}
          ${sizeClasses}
          rounded-lg font-medium transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2
          ${className}
        `}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{buttonLabel}</span>
          </>
        )}
      </button>

      {/* Notification component */}
      {NotificationComponent}
    </>
  );
};

export default WidgetPreviewButton;
