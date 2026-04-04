import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { clientApi, publicApi } from "../../api";
import GreetoIcon from "../../assets/GreetoIconWhite.svg";
import Icon from "../../components/Icon";

interface MenuItem {
    label: string;
    path: string;
    icon: string;
    badge?: string;
}

interface NavSection {
    title: string;
    items: MenuItem[];
}

interface SubscriptionData {
    plan: string;
    status: string;
    is_trial: boolean;
}

interface BillingPlan {
    limits: {
        messages_per_month?: number;
    };
}

interface UsageData {
    messages_used_this_month?: number;
}

const navSections: NavSection[] = [
    {
        title: "MAIN",
        items: [
            { label: "Dashboard", path: "/client/dashboard", icon: "dashboard" },
            { label: "Analytics", path: "/client/analytics", icon: "analytics" },
        ],
    },
    {
        title: "MANAGE",
        items: [
            { label: "Chatbot Config", path: "/client/chatbot-config", icon: "settings" },
            { label: "Web Scraper", path: "/client/web-scraper", icon: "search" },
            { label: "Conversations", path: "/client/conversations", icon: "chat" },
            { label: "Leads", path: "/client/leads", icon: "users" },
            { label: "Test Chatbot", path: "/client/test-chatbot", icon: "chatbot" },
            { label: "My Subscription", path: "/client/my-subscription", icon: "subscription" },
        ],
    },
    {
        title: "SYSTEM",
        items: [
            { label: "Settings", path: "/client/settings", icon: "settings" },
        ],
    },
];

export default function ClientSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userRole, signOut } = useAuth();
    const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
    const [billingPlan, setBillingPlan] = useState<BillingPlan | null>(null);
    const [messagesUsed, setMessagesUsed] = useState(0);
    const [messagesLimit, setMessagesLimit] = useState(0);
    const [clientId, setClientId] = useState<number | null>(null);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    useEffect(() => {
        fetchSubscriptionData();
    }, []);

    useEffect(() => {
        if (clientId) {
            fetchMessageCount();
        }
    }, [clientId]);

    useEffect(() => {
        if (subscription?.plan) {
            fetchBillingPlanAndLimit();
        }
    }, [subscription?.plan]);

    const fetchSubscriptionData = async () => {
        try {
            const response = await clientApi.getClientProfile();
            if (response.subscription) {
                setSubscription({
                    plan: response.subscription.plan,
                    status: response.subscription.status,
                    is_trial: response.subscription.is_trial,
                });
            }
            // Extract client ID
            const id = response.client_id || (response as any).user_client_id;
            if (id) {
                setClientId(id);
            }
        } catch (err) {
            console.error('Error fetching subscription data:', err);
        }
    };

    const fetchMessageCount = async () => {
        try {
            if (!clientId) return;
            const messageData = await clientApi.getMessageCount(clientId);
            setMessagesUsed(messageData.total_messages || 0);
        } catch (err) {
            console.error('Error fetching message count:', err);
        }
    };

    const fetchBillingPlanAndLimit = async () => {
        try {
            if (subscription?.plan) {
                const planCode = subscription.plan.toLowerCase().replace(/\s+/g, '_');
                const planData = await publicApi.getBillingPlanByCode(planCode);
                setBillingPlan(planData);
                setMessagesLimit(planData.limits?.messages_per_month || 0);
            }
        } catch (err) {
            console.error('Error fetching billing plan:', err);
        }
    };

    const getSubscriptionBadgeColor = (plan: string, isTrial?: boolean) => {
        if (isTrial) return 'bg-blue-500';
        switch (plan?.toLowerCase()) {
            case 'starter': return 'bg-slate-500';
            case 'professional': return 'bg-[var(--color-primary)]';
            case 'business': return 'bg-[var(--color-success)]';
            case 'enterprise': return 'bg-[var(--color-warning)]';
            default: return 'bg-[var(--color-primary)]';
        }
    };

    const getShortPlanName = (plan: string) => {
        switch (plan?.toLowerCase()) {
            case 'starter': return 'Starter';
            case 'professional': return 'Pro';
            case 'business': return 'Business';
            case 'enterprise': return 'Enterprise';
            case 'trial': return 'Trial';
            default: return 'Plan';
        }
    };

    const formatPlanName = (plan: string, isTrial: boolean) => {
        if (isTrial) return 'Trial';
        return getShortPlanName(plan);
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="w-[var(--sidebar-width)] h-full bg-[var(--color-bg-dark)] fixed left-0 top-0 z-[100] flex flex-col">
            {/* Logo Section */}
            <div className="px-6 py-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        <img src={GreetoIcon} alt="Greeto" className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                            Greeto AI
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 ml-[52px]">
                    <span className="text-xs text-[var(--color-text-light)] opacity-60 font-medium">Client Panel</span>
                    <span className={`${getSubscriptionBadgeColor(subscription?.plan || '', subscription?.is_trial)} text-white text-[8px] px-2 py-0.5 rounded-full font-bold tracking-wider whitespace-nowrap`}>
                        {subscription ? formatPlanName(subscription.plan, subscription.is_trial) : '...'}
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-5">
                {navSections.map((section, idx) => (
                    <div key={idx} className="mb-6">
                        <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-light)] opacity-40 font-semibold px-6 mb-2">
                            {section.title}
                        </div>

                        {section.items.map((item, itemIdx) => (
                            <div
                                key={itemIdx}
                                onClick={() => navigate(item.path)}
                                className={`
                                    flex items-center gap-3 mx-3 px-3 py-2.5 text-[14px] font-medium cursor-pointer
                                    transition-all duration-[var(--transition-fast)] rounded-lg mb-0.5
                                    ${isActive(item.path)
                                        ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/25"
                                        : "text-white/70 hover:bg-white/8 hover:text-white"
                                    }
                                `}
                            >
                                <Icon
                                    name={item.icon}
                                    size="sm"
                                    decorative
                                    className={isActive(item.path) ? "opacity-60" : "brightness-0 invert"}
                                />
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <span className="bg-[var(--color-error)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Message Usage Progress Bar */}
            {messagesLimit > 0 && (
                <div className="px-4 py-4 border-t border-white/10">
                    <div className="mb-2">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-white uppercase tracking-[0.05em]">
                                Messages
                            </span>
                            <span className="text-xs text-white/60">
                                {messagesUsed.toLocaleString()}/{messagesLimit.toLocaleString()}
                            </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)]"
                                style={{
                                    width: Math.min(100, ((messagesUsed / messagesLimit) * 100)),
                                }}
                            />
                        </div>
                        <div className="text-[10px] text-white/50 mt-1.5">
                            {Math.round((messagesUsed / messagesLimit) * 100)}% used this month
                        </div>
                    </div>
                </div>
            )}

            {/* User Profile Footer */}
            <div className="px-4 py-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors duration-[var(--transition-fast)] group" onClick={handleSignOut}>
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {userRole?.userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-white truncate">{userRole?.userName || 'User'}</div>
                        <div className="text-[11px] text-[var(--color-text-light)] opacity-50">
                            {userRole?.role === 'super_admin' ? 'Administrator' : 'Client User'}
                        </div>
                    </div>
                    <LogOut size={16} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    )
}
