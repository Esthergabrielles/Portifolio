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
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}