export type ViewState = 'HOME' | 'MURAL' | 'FINANCE' | 'FOCUS' | 'EDUCATION' | 'COMMUNITY';

export interface Job {
  id: string;
  title: string;
  description: string;
  contact: string;
  createdAt: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  timestamp: number;
}

export interface User {
  name: string;
  points: number;
}