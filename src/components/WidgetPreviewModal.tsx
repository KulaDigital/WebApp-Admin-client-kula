import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { WidgetPreviewData } from '../types';

interface WidgetPreviewModalProps {
  open: boolean;
  onClose: () => void;
  data: WidgetPreviewData | null;
  isLoading: boolean;
  error: string | null;
}

const WidgetPreviewModal: React.FC<WidgetPreviewModalProps> = ({
  open,
  onClose,
  data,
  isLoading,
  error,
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'not-live'>('live');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  // Inject widget script into iframe for "not-live" mode
  useEffect(() => {
    if (activeTab === 'not-live' && iframeRef.current && data && !isLoading && !error) {
      try {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc) {
          // Clear previous content
          iframeDoc.body.innerHTML = '';

          // Create a simple page structure
          const html = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${data.website_url}</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  min-height: 100vh;
                  padding: 20px;
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
                  margin-bottom: 20px;
                  font-size: 32px;
                }
                p {
                  color: #666;
                  line-height: 1.6;
                  margin-bottom: 15px;
                }
                .preview-badge {
                  display: inline-block;
                  background: #FEF3C7;
                  color: #92400E;
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
                <div class="preview-badge">🔴 PREVIEW MODE - Widget Live</div>
                <h1>Welcome to Your Website</h1>
                <p>This is a preview of how your Greeto chat widget will appear on your website when it's live.</p>
                <p>The chat widget will appear in the bottom-right corner of your website, ready to assist your visitors with questions and leads.</p>
              </div>
            </body>
            </html>
          `;
          iframeDoc.open();
          iframeDoc.write(html);
          iframeDoc.close();

          // Inject widget script
          const script = iframeDoc.createElement('script');
          script.src = `${import.meta.env.VITE_API_BASE_URL}/widget.js`;
          script.setAttribute('data-api-key', data.api_key);
          script.async = true;
          script.onload = () => setWidgetLoaded(true);
          script.onerror = () => {
            console.warn('Widget script failed to load - this may be expected in preview mode');
            setWidgetLoaded(true);
          };
          iframeDoc.body.appendChild(script);
        }
      } catch (err) {
        console.error('Error injecting widget script:', err);
      }
    } else if (activeTab === 'live' && iframeRef.current && data && !isLoading && !error) {
      // For "live" mode, just load the website
      try {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc) {
          const html = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${data.website_url}</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  min-height: 100vh;
                  padding: 20px;
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
                  margin-bottom: 20px;
                  font-size: 32px;
                }
                p {
                  color: #666;
                  line-height: 1.6;
                  margin-bottom: 15px;
                }
                .preview-badge {
                  display: inline-block;
                  background: #DBEAFE;
                  color: #0C4A6E;
                  padding: 8px 16px;
                  border-radius: 8px;
                  font-size: 12px;
                  font-weight: 600;
                  margin-bottom: 20px;
                }
                .widget-info {
                  background: #F0FDF4;
                  border-left: 4px solid #22C55E;
                  padding: 16px;
                  border-radius: 8px;
                  margin-top: 20px;
                }
                .widget-info h3 {
                  color: #166534;
                  font-size: 14px;
                  margin-bottom: 8px;
                }
                .widget-info p {
                  color: #166534;
                  font-size: 14px;
                  margin-bottom: 0;
                }
                .widget-preview {
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  background: var(--color-primary, #667eea);
                  color: white;
                  padding: 12px 16px;
                  border-radius: 50%;
                  width: 56px;
                  height: 56px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 24px;
                  cursor: pointer;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="preview-badge">✅ PREVIEW MODE - Website Only</div>
                <h1>Your Website</h1>
                <p>This is a preview of your website as your visitors will see it. Notice the chat widget (blue circle) in the bottom-right corner.</p>
                <p>When you click "Widget Not Live" in the preview settings, you'll see the actual Greeto chat widget loaded on your website with your configuration.</p>
                <div class="widget-info">
                  <h3>💬 Chat Widget Preview</h3>
                  <p>The chat widget will appear as a floating button in the corner. Click it to open the chat interface.</p>
                </div>
              </div>
              <div class="widget-preview" onclick="alert('This is a preview. Click the Widget Not Live tab to see the actual widget.')">💬</div>
            </body>
            </html>
          `;
          iframeDoc.open();
          iframeDoc.write(html);
          iframeDoc.close();
          setWidgetLoaded(true);
        }
      } catch (err) {
        console.error('Error loading website preview:', err);
      }
    }
  }, [activeTab, data, isLoading, error]);

  if (!open) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Chat Widget Preview</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading preview...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-50 border-l-4 border-red-500">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-red-800">Error Loading Preview</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        {!isLoading && !error && (
          <>
            <div className="flex border-b border-gray-200 px-6 pt-4">
              <button
                onClick={() => {
                  setActiveTab('live');
                  setWidgetLoaded(false);
                }}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'live'
                    ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                ✅ Widget Live (Website View)
              </button>
              <button
                onClick={() => {
                  setActiveTab('not-live');
                  setWidgetLoaded(false);
                }}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'not-live'
                    ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                🔴 Widget Not Live (Injected)
              </button>
            </div>

            {/* Preview Mode Indicator */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-800 bg-amber-50 px-3 py-2 rounded-lg w-fit border border-amber-200">
                <span>⚠️</span>
                <span>Preview Mode - Widget interactions are simulated</span>
              </div>
            </div>

            {/* iframe Container */}
            <div className="flex-1 overflow-hidden">
              {widgetLoaded && activeTab === 'not-live' ? (
                <div className="w-full h-full bg-gray-100">
                  <iframe
                    ref={iframeRef}
                    title="Chat Widget Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              ) : activeTab === 'live' ? (
                <div className="w-full h-full bg-gray-100">
                  <iframe
                    ref={iframeRef}
                    title="Website Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading widget...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-xs text-gray-600">
                <p>
                  <strong>Website URL:</strong> {data?.website_url || 'N/A'}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{ backgroundColor: 'var(--color-primary)' }}
                className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
              >
                Close Preview
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default WidgetPreviewModal;
