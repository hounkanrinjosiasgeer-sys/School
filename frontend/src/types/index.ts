export interface Sheet {
  id: string;
  title: string;
  level: string;
  subject: string;
  topic: string;
  duration: string;
  content: string;
  exercises?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  school?: string;
  subscriptionStatus: 'free' | 'premium';
  joinedAt: string;
}
