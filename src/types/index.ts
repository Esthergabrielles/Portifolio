export interface Project {
  id: string;
  name: string;
  company: string;
  type: string;
  technologies: string[];
  description: string;
  image: string;
  details: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image: string;
  category: string;
  description?: string;
  skills?: string[];
}

export interface Skill {
  id?: string;
  name: string;
  level: number;
  icon: string;
  category?: 'technical' | 'documentation' | 'soft';
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'paused';
  category: string;
  startDate: string;
  expectedEnd?: string;
  completedDate?: string;
  description?: string;
  skills?: string[];
  color: string;
  logo?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: string;
}

export interface PersonalInfo {
  id?: string;
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
}

export interface Feedback {
  id: string;
  rating: number;
  feedbackText?: string;
  category?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}