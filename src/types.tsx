// types/index.ts

// Common types
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
export type ChangeType = 'positive' | 'negative';
export type IconColor = 'blue' | 'purple' | 'green' | 'orange' | 'red';

// Stat Card Props
export interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: ChangeType;
  iconColor?: IconColor;
}

// Top Header Props
export interface TopHeaderProps {
  currentPage?: string;
}

// Client Data
export interface Client {
  name: string;
  email: string;
  plan: string;
  chatbots: number;
  mrr: string;
  status: string;
}

// Chatbot Data
export interface Chatbot {
  name: string;
  client: string;
  model: string;
  conversations: string;
  status: string;
}

// Subscription Data
export interface Subscription {
  client: string;
  plan: string;
  price: string;
  nextBilling: string;
  status: string;
}

// Recent Activity Data
export interface Activity {
  client: string;
  action: string;
  plan: string;
  status: string;
  date: string;
}

// Usage Data
export interface Usage {
  client: string;
  apiCalls: string;
  storage: string;
  bandwidth: string;
  cost: string;
}

// Integration Data
export interface Integration {
  name: string;
  icon: string;
  description: string;
  status: 'Connected' | 'Available';
  color: 'purple' | 'blue';
}

// Security Log Data
export interface SecurityLog {
  action: string;
  user: string;
  ip: string;
  location: string;
  time: string;
  status: 'success' | 'failed';
}

// Settings State
export interface SettingsState {
  platformName: string;
  supportEmail: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  webhookUrl: string;
  apiKey: string;
}