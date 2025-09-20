import { Code, Database, BrainCircuit, Star, Briefcase, GraduationCap, Mail, Phone, MapPin, BookOpen, Award, User, FileText, Camera, BookCopy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavigationLink {
  name: string;
  href?: string;
  sublinks?: {
    name: string;
    href: string;
  }[];
}

export const navigationLinks: NavigationLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  {
    name: 'Projects',
    href: '#projects',
  },
  { name: 'Publications', href: '#publications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Skills', href: '#skills' },
  { name: 'Courses & Certs', href: '#courses-certifications' },
  { name: 'References', href: '#references' },
  { name: 'Contact Me', href: '#contact' },
  { name: 'Media', href: '#media' },
];

export const skills: { name: string; icon: LucideIcon }[] = [
  { name: 'React', icon: Code },
  { name: 'Node.js', icon: Code },
  { name: 'Python', icon: Code },
  { name: 'SQL', icon: Database },
  { name: 'TensorFlow', icon: BrainCircuit },
  { name: 'Next.js', icon: Code },
];

export const education = [
  {
    institution: 'University of Technology',
    degree: 'M.S. in Computer Science',
    period: '2018 - 2020',
    description: 'Focused on Artificial Intelligence and Machine Learning. Thesis on neural network optimization.',
  },
  {
    institution: 'State College',
    degree: 'B.S. in Software Engineering',
    period: '2014 - 2018',
    description: 'Graduated with honors. Active member of the coding club and participated in several hackathons.',
  },
];

export const experiences = [
  {
    company: 'Innovatech Solutions',
    role: 'Senior Software Engineer',
    period: '2022 - Present',
    description: 'Leading a team to develop a new cloud-based SaaS platform. Responsible for architecture, code reviews, and mentoring junior developers.',
  },
  {
    company: 'Data Systems Inc.',
    role: 'Software Engineer',
    period: '2020 - 2022',
    description: 'Worked on the backend services for a large-scale data processing pipeline. Improved system efficiency by 20%.',
  },
];

export const researchProjects = [
    {
        title: 'Advanced AI for Predictive Analytics',
        description: 'A project exploring the use of deep learning models to predict market trends with high accuracy.',
        imageUrlId: 'research-1',
    },
    {
        title: 'Quantum Computing Simulations',
        description: 'Simulating quantum algorithms on classical computers to test their potential applications in cryptography.',
        imageUrlId: 'research-2',
    }
];

export const certifications = [
  'Certified Kubernetes Application Developer (CKAD)',
  'AWS Certified Solutions Architect – Associate',
  'Google Certified Professional Data Engineer',
];

export const honorsAndAwards = [
  'Innovatech Hackathon Winner - 2023',
  'Employee of the Year, Data Systems Inc. - 2021',
  'Dean\'s List, University of Technology',
];

export const publications = [
  '"Optimizing Convolutional Neural Networks for Image Recognition", AI Journal, 2020',
  '"A Novel Approach to Distributed Data Processing", Proceedings of Big Data Conf, 2021',
];

export const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce site with features like product search, cart, and payment integration.',
    imageUrlId: 'project-1',
    url: '#',
  },
  {
    title: 'Task Management App',
    description: 'A mobile-friendly application to help users organize their daily tasks and improve productivity.',
    imageUrlId: 'project-2',
    url: '#',
  },
  {
    title: 'Data Dashboard',
    description: 'A web-based dashboard for visualizing complex datasets with interactive charts and graphs.',
    imageUrlId: 'project-3',
    url: '#',
  },
  {
    title: 'AI Chatbot',
    description: 'A machine learning-powered chatbot for customer service, integrated with a messaging platform.',
    imageUrlId: 'project-4',
    url: '#',
  },
];

export const contactInfo = [
    { icon: Mail, text: 'hello@portfoliopilot.com' },
    { icon: Phone, text: '+1 (234) 567-890' },
    { icon: MapPin, text: 'San Francisco, CA' },
];
