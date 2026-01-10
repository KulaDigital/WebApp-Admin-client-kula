// pages/Clients.tsx
import React from 'react';
import type { Client } from '../../types';

const Clients: React.FC = () => {
  const clients: Client[] = [
    { name: 'Acme Corporation', email: 'contact@acme.com', plan: 'Enterprise', chatbots: 12, mrr: '$499', status: 'Active' },
    { name: 'TechStart Inc', email: 'hello@techstart.io', plan: 'Professional', chatbots: 8, mrr: '$199', status: 'Active' },
    { name: 'Global Solutions', email: 'info@globalsolutions.com', plan: 'Enterprise', chatbots: 12, mrr: '$499', status: 'Active' },
    { name: 'Digital Hub', email: 'team@digitalhub.net', plan: 'Business', chatbots: 5, mrr: '$299', status: 'Trial' },
  ];

  const getBadgeClass = (plan: string): string => {
    const classes: Record<string, string> = {
      'Enterprise': 'bg-purple-100 text-purple-700',
      'Professional': 'bg-blue-100 text-blue-700',
      'Business': 'bg-status-info/10 text-status-info',
    };
    return classes[plan] || 'bg-gray-100 text-gray-700';
  };

  const getStatusBadge = (status: string): string => {
    const classes: Record<string, string> = {
      'Active': 'bg-green-100 text-green-700',
      'Trial': 'bg-yellow-100 text-yellow-700',
      'Inactive': 'bg-red-100 text-red-700',
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-bg-light min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1>
          Client Management
        </h1>
        <p className="text-text-secondary font-body">
          Manage all your clients and their subscriptions
        </p>
      </div>

      {/* Clients Table Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="text-xl font-bold text-text-primary font-heading">
            All Clients
          </h3>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover transition-colors">
            + Add Client
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-light border-b border-[#E2E8F0]">
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Chatbots
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  MRR
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
              {clients.map((client, index) => (
                <tr key={index} className="hover:bg-bg-light transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-text-primary">{client.name}</span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{client.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBadgeClass(client.plan)}`}>
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{client.chatbots}</td>
                  <td className="px-6 py-4 text-text-secondary font-semibold">{client.mrr}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-[#E2E8F0] rounded-md hover:bg-bg-light transition-colors">
                      View
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

export default Clients;