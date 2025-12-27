import React from 'react';
import type { Subscription } from '../../types';

const Subscriptions: React.FC = () => {
  const subscriptions: Subscription[] = [
    { client: 'Acme Corporation', plan: 'Enterprise', price: '$499/month', nextBilling: 'Jan 15, 2025', status: 'Active' },
    { client: 'TechStart Inc', plan: 'Professional', price: '$199/month', nextBilling: 'Jan 20, 2025', status: 'Active' },
    { client: 'Digital Hub', plan: 'Business', price: '$299/month', nextBilling: 'Jan 10, 2025', status: 'Trial' },
    { client: 'Global Solutions', plan: 'Enterprise', price: '$499/month', nextBilling: 'Jan 25, 2025', status: 'Active' },
  ];

  const getStatusBadge = (status: string): string => {
    const classes: Record<string, string> = {
      'Active': 'bg-green-100 text-green-700',
      'Trial': 'bg-yellow-100 text-yellow-700',
      'Expired': 'bg-red-100 text-red-700',
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-10 bg-bg-light min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1>
          Subscription Plans
        </h1>
        <p className="text-text-secondary font-body">
          Manage pricing tiers and client subscriptions
        </p>
      </div>

      {/* Subscriptions Table Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h3 className="text-xl font-bold text-text-primary font-heading">
            Active Subscriptions
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-light border-b border-[#E2E8F0]">
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Next Billing
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {subscriptions.map((sub, index) => (
                <tr key={index} className="hover:bg-bg-light transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-text-primary">{sub.client}</span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{sub.plan}</td>
                  <td className="px-6 py-4 text-text-secondary font-semibold">{sub.price}</td>
                  <td className="px-6 py-4 text-text-secondary">{sub.nextBilling}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-[#E2E8F0] rounded-md hover:bg-bg-light transition-colors">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;