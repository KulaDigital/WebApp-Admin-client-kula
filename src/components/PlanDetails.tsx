import React, { useState, useEffect } from 'react';
import { publicApi } from '../api';
import Icon from './Icon';

interface BillingPlan {
  idx: number;
  code: string;
  display_name: string;
  is_active: boolean;
  prices: {
    yearly: number;
    monthly: number;
    currency: string;
  };
  limits: {
    messages_per_month?: number;
    overage_per_conversation_inr?: number;
    trial_days?: number;
  };
  entitlements: {
    seats: number;
    channels: string[];
    features: Record<string, any>;
    chatbot_count: number;
    support_channel: string;
    support_sla_hours: number;
  };
}

interface PlanDetailsProps {
  currentPlanCode?: string;
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ currentPlanCode }) => {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await publicApi.getAllBillingPlans();
      // Filter only active plans and sort by idx
      const activePlans = Array.isArray(data) ? data.filter((p) => p.is_active) : [];
      setPlans(activePlans.sort((a, b) => a.idx - b.idx));
    } catch (err) {
      console.error('Failed to fetch billing plans:', err);
      setError('Failed to load billing plans');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatFeatureName = (key: string) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getFeatureIcon = (enabled: boolean) => {
    return enabled ? (
      <span className="text-[var(--color-success)] font-bold text-lg">✓</span>
    ) : (
      <span className="text-[var(--color-text-light)] opacity-30">✗</span>
    );
  };

  if (error) {
    return (
      <div className="card p-8 text-center">
        <p className="text-[var(--color-error)] font-medium">{error}</p>
        <button
          onClick={fetchPlans}
          className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card p-8 text-center">
        <p className="text-[var(--color-text-secondary)] font-medium">Loading plans...</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-[var(--color-text-secondary)]">No billing plans available</p>
      </div>
    );
  }

  // Get all unique feature keys from all plans
  const allFeatureKeys = Array.from(
    new Set(
      plans.flatMap((p) => Object.keys(p.entitlements.features))
    )
  ).sort();

  // Other entitlements to display
  const otherEntitlements = ['seats', 'chatbot_count', 'support_channel', 'support_sla_hours'];

  return (
    <div className="space-y-6">
      {/* Plans Grid - Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => {
          const isCurrent = plan.code === currentPlanCode;
          return (
            <div
              key={plan.code}
              className={`card p-6 transition-all ${
                isCurrent
                  ? 'ring-2 ring-[var(--color-primary)] bg-gradient-to-br from-[var(--color-primary-light,#eff6ff)] to-white'
                  : 'hover:shadow-lg'
              }`}
            >
              {/* Marketing Badge */}
              {plan.display_name.includes('Most Popular') && (
                <div className="mb-3 inline-block">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[var(--color-warning)] text-white">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {plan.display_name.split('(')[0].trim()}
              </h3>

              {/* Current Plan Badge */}
              {isCurrent && (
                <div className="mb-4 inline-block">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[var(--color-success)] text-white">
                    Current Plan
                  </span>
                </div>
              )}

              {/* Pricing */}
              <div className="mb-6">
                <div className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {formatPrice(plan.prices.monthly)}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)]">per month</div>
                {plan.prices.yearly > 0 && (
                  <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                    {formatPrice(plan.prices.yearly)}/year
                  </div>
                )}
              </div>

              {/* Key Features Preview */}
              <div className="space-y-2 text-sm">
                {plan.limits.messages_per_month && (
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-success)]">✓</span>
                    <span className="text-[var(--color-text-secondary)]">
                      {plan.limits.messages_per_month.toLocaleString()} msgs/month
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span>
                  <span className="text-[var(--color-text-secondary)]">{plan.entitlements.seats} seat{plan.entitlements.seats !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--color-success)]">✓</span>
                  <span className="text-[var(--color-text-secondary)]">
                    {plan.entitlements.channels.slice(0, 2).join(', ')}
                    {plan.entitlements.channels.length > 2 ? ` +${plan.entitlements.channels.length - 2}` : ''}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Comparison Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Detailed Comparison
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <th className="sticky left-0 bg-[var(--color-bg-secondary)] px-6 py-3 text-left font-semibold text-[var(--color-text-primary)]">
                  Feature
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.code}
                    className={`px-6 py-3 text-center font-semibold ${
                      plan.code === currentPlanCode
                        ? 'bg-[var(--color-primary-light,#eff6ff)] text-[var(--color-primary)]'
                        : 'text-[var(--color-text-primary)]'
                    }`}
                  >
                    {plan.display_name.split('(')[0].trim()}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Pricing Row */}
              <tr className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]">
                <td className="sticky left-0 bg-white px-6 py-4 font-semibold text-[var(--color-text-primary)]">
                  Monthly Price
                </td>
                {plans.map((plan) => (
                  <td key={plan.code} className="px-6 py-4 text-center text-[var(--color-text-primary)]">
                    {plan.prices.monthly === 0 ? <span className="text-[var(--color-success)] font-bold">FREE</span> : formatPrice(plan.prices.monthly)}
                  </td>
                ))}
              </tr>

              {/* Other Entitlements */}
              {otherEntitlements.map((entitlement) => (
                <tr key={entitlement} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]">
                  <td className="sticky left-0 bg-white px-6 py-4 font-semibold text-[var(--color-text-primary)]">
                    {formatFeatureName(entitlement)}
                  </td>
                  {plans.map((plan) => {
                    let value: any = plan.entitlements[entitlement as keyof typeof plan.entitlements];

                    if (entitlement === 'channels') {
                      value = (plan.entitlements.channels as string[]).join(', ');
                    }

                    if (entitlement === 'support_sla_hours') {
                      value = `${value}h`;
                    }

                    return (
                      <td key={plan.code} className="px-6 py-4 text-center text-[var(--color-text-secondary)]">
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Messages Limit */}
              <tr className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]">
                <td className="sticky left-0 bg-white px-6 py-4 font-semibold text-[var(--color-text-primary)]">
                  Messages/Month
                </td>
                {plans.map((plan) => (
                  <td key={plan.code} className="px-6 py-4 text-center text-[var(--color-text-secondary)]">
                    {plan.limits.messages_per_month ? plan.limits.messages_per_month.toLocaleString() : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Features Section Header */}
              <tr className="bg-[var(--color-bg-secondary)]">
                <td colSpan={plans.length + 1} className="px-6 py-3 font-bold text-[var(--color-text-primary)]">
                  Features Included
                </td>
              </tr>

              {/* Feature Rows */}
              {allFeatureKeys.map((featureKey) => (
                <tr key={featureKey} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)]">
                  <td className="sticky left-0 bg-white px-6 py-3 text-sm font-medium text-[var(--color-text-primary)]">
                    {formatFeatureName(featureKey)}
                  </td>
                  {plans.map((plan) => {
                    const featureValue = plan.entitlements.features[featureKey];
                    return (
                      <td key={plan.code} className="px-6 py-3 text-center">
                        {typeof featureValue === 'boolean' ? (
                          getFeatureIcon(featureValue)
                        ) : (
                          <span className="text-[var(--color-text-secondary)] text-xs">{String(featureValue)}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="text-xs text-[var(--color-text-secondary)] text-center">
        ✓ Feature included • ✗ Feature not included
      </div>
    </div>
  );
};

export default PlanDetails;
