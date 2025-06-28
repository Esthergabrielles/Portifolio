import { Project, Certificate, Skill } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Testing',
    company: 'TechCorp',
    type: 'Functional Testing',
    technologies: ['Selenium', 'Python', 'Jenkins', 'TestRail'],
    description: 'Comprehensive testing of e-commerce platform with focus on user experience and payment flows.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: 'Led end-to-end testing for a major e-commerce platform, ensuring seamless user experience across web and mobile platforms. Implemented automated test suites that reduced manual testing time by 60%.'
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    company: 'FinanceBank',
    type: 'Security Testing',
    technologies: ['Appium', 'OWASP ZAP', 'Burp Suite', 'Postman'],
    description: 'Security and performance testing for mobile banking application.',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: 'Conducted thorough security testing for mobile banking app, identifying and helping resolve critical vulnerabilities. Performed penetration testing and ensured compliance with financial regulations.'
  },
  {
    id: '3',
    name: 'Healthcare Management System',
    company: 'MedTech Solutions',
    type: 'API Testing',
    technologies: ['REST Assured', 'Java', 'Newman', 'Docker'],
    description: 'API testing and integration testing for healthcare management platform.',
    image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: 'Designed and executed comprehensive API testing strategy for healthcare management system, ensuring data integrity and HIPAA compliance across all endpoints.'
  },
  {
    id: '4',
    name: 'SaaS Dashboard',
    company: 'CloudTech',
    type: 'Performance Testing',
    technologies: ['JMeter', 'LoadRunner', 'Grafana', 'New Relic'],
    description: 'Performance and load testing for SaaS analytics dashboard.',
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
    details: 'Executed performance testing strategy that optimized system response times by 40% and improved user satisfaction scores. Analyzed bottlenecks and provided actionable recommendations.'
  }
];

export const certificates: Certificate[] = [
  {
    id: '1',
    name: 'ISTQB Foundation Level',
    issuer: 'ISTQB',
    date: '2023',
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Testing'
  },
  {
    id: '2',
    name: 'Certified Agile Testing',
    issuer: 'Agile Alliance',
    date: '2023',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Agile'
  },
  {
    id: '3',
    name: 'Selenium WebDriver',
    issuer: 'Mate Academy',
    date: '2024',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Automation'
  },
  {
    id: '4',
    name: 'API Testing with Postman',
    issuer: 'Postman',
    date: '2024',
    image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'API Testing'
  }
];

export const technicalSkills: Skill[] = [
  { name: 'Test Automation', level: 90, icon: 'Bot' },
  { name: 'Manual Testing', level: 95, icon: 'Search' },
  { name: 'API Testing', level: 85, icon: 'Globe' },
  { name: 'Performance Testing', level: 80, icon: 'Zap' },
  { name: 'Security Testing', level: 75, icon: 'Shield' },
  { name: 'Mobile Testing', level: 85, icon: 'Smartphone' }
];

export const softSkills: Skill[] = [
  { name: 'Problem Solving', level: 95, icon: 'Lightbulb' },
  { name: 'Team Collaboration', level: 90, icon: 'Users' },
  { name: 'Communication', level: 90, icon: 'MessageCircle' },
  { name: 'Critical Thinking', level: 85, icon: 'Brain' },
  { name: 'Attention to Detail', level: 95, icon: 'Eye' },
  { name: 'Time Management', level: 85, icon: 'Clock' }
];