// components/Sidebar.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
    label: string;
    path: string;
    badge?: string;
}

interface NavSection {
    title: string;
    items: MenuItem[];
}

const navSections: NavSection[] = [
    {
        title: "MAIN",
        items: [
            { label: "Dashboard", path: "/SA/dashboard" },
            { label: "Analytics", path: "/SA/analytics" },
        ],
    },
    {
        title: "MANAGEMENT",
        items: [
            { label: "Clients", path: "/SA/clients" },
            { label: "Chatbots", path: "/SA/chatbots" },
            { label: "Subscriptions", path: "/SA/subscriptions" },
            { label: "Billing & Revenue", path: "/SA/usage" },
            { label: "Usage", path: "/SA/usage" },
        ],
    },
    {
        title: "SUPPORT",
        items: [
            { label: "Tickets", path: "/SA/clients" },
            { label: "Active Logs", path: "/SA/chatbots" },
            { label: "User Feedback", path: "/SA/subscriptions" },
        ],
    },
    {
        title: "SYSTEM",
        items: [

            { label: "Settings", path: "/SA/settings" },
            { label: "API Management", path: "/SA/integrations" },
            { label: "Integrations", path: "/SA/integrations" },
            { label: "Security", path: "/SA/security" },
        ],
    },
];

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="w-[280px] h-full bg-[#0A2540] fixed left-0 top-0 z-[100]">
            {/* Logo Section */}
            <div className="px-6 py-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#635BFF] to-[#5448E0] rounded-lg flex items-center justify-center text-xl">
                        💬
                    </div>
                    <div>
                        <div className="text-xl font-extrabold text-white font-heading">
                            Kula Chat AI
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 ml-[52px]">
                    <span className="text-xs text-[#E3E8EF] opacity-70 font-medium">Super Admin Panel</span>
                    <span className="bg-[#635BFF] text-white text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wide">
                        SUPER
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <div className="h-[60%] overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-white/10 ">
                {navSections.map((section, idx) => (
                    <div key={idx} className="mb-8">
                        {/* Section Title */}
                        <div className="text-[11px] uppercase tracking-wider text-[#E3E8EF] opacity-50 font-bold px-6 mb-3">
                            {section.title}
                        </div>

                        {/* Section Items */}
                        {section.items.map((item, itemIdx) => (
                            <div
                                key={itemIdx}
                                onClick={() => navigate(item.path)}
                                className={`
                                    flex items-center gap-3 px-6 py-3 text-[15px] font-medium cursor-pointer
                                    transition-all duration-200 relative border-l-3 border-transparent
                                    ${isActive(item.path)
                                        ? "bg-[#635BFF] text-white font-semibold border-l-[#635BFF]"
                                        : "text-[#E3E8EF] hover:bg-[#635BFF]/10 hover:text-white hover:border-l-[#635BFF]"
                                    }
                                `}
                            >
                                {/* Label */}
                                <span className="flex-1">{item.label}</span>

                                {/* Badge */}
                                {item.badge && (
                                    <span className="ml-auto bg-[#EF4444] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* User Profile Footer */}
            <div className="px-5 py-5 border-t border-white/10">
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-[#635BFF] flex items-center justify-center text-white font-bold text-base">
                        SA
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold text-sm text-white">Super Admin</div>
                        <div className="text-xs text-[#E3E8EF] opacity-70">Administrator</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;