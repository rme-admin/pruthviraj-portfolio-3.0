
import { Code, Database, BrainCircuit, Star, Briefcase, GraduationCap, Mail, Phone, MapPin, BookOpen, Award, User, FileText, Camera, BookCopy, TestTube, FunctionSquare, Laptop, Wind, Cloud, Lightbulb, Tractor, Dumbbell, Gamepad, Paintbrush, Plane, Linkedin, Twitter, Instagram, PenSquare, FlaskConical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavigationLink {
  name: string;
  href?: string;
  sublinks?: {
    name: string;
    href: string;
  }[];
}

export const primaryNavigationLinks: NavigationLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
];

export const secondaryNavigationLinks: NavigationLink[] = [
  { name: 'Projects', href: '#projects' },
  { name: 'Publications', href: '#publications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Skills', href: '#skills' },
  { name: 'Courses and Certificates', href: '#courses-certifications' },
  { name: 'References', href: '#references' },
  { name: 'Contact Me', href: '#contact' },
  { name: 'Media', href: '#media' },
];

export const skills: { name: string; icon: LucideIcon, category: 'Technical' | 'Research' | 'Hobby' }[] = [
  { name: 'React', icon: Code, category: 'Technical' },
  { name: 'Node.js', icon: Code, category: 'Technical' },
  { name: 'Python', icon: Code, category: 'Technical' },
  { name: 'C', icon: Code, category: 'Technical' },
  { name: 'C++', icon: Code, category: 'Technical' },
  { name: 'SQL', icon: Database, category: 'Technical' },
  { name: 'TensorFlow', icon: BrainCircuit, category: 'Research' },
  { name: 'Next.js', icon: Code, category: 'Technical' },
  { name: 'UV-Spectroscopy', icon: TestTube, category: 'Research' },
  { name: 'Gaussian', icon: FunctionSquare, category: 'Research' },
  { name: 'Badminton', icon: Dumbbell, category: 'Hobby' },
  { name: 'IoT', icon: Lightbulb, category: 'Hobby' },
  { name: 'Agriculture', icon: Tractor, category: 'Hobby' },
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

export interface ResearchProject {
  title: string;
  description: string;
  imageUrlId: string;
  date: string;
  location: string;
}

export const researchProjects: ResearchProject[] = [
    {
        title: 'Advanced AI for Predictive Analytics',
        description: 'A project exploring the use of deep learning models to predict market trends with high accuracy.',
        imageUrlId: 'research-1',
        date: '10/2023',
        location: 'University of Technology'
    },
    {
        title: 'Quantum Computing Simulations',
        description: 'Simulating quantum algorithms on classical computers to test their potential applications in cryptography.',
        imageUrlId: 'research-2',
        date: '08/2022',
        location: 'Tech Conference 2022'
    }
];

export const certifications = [
  { name: 'Certified Kubernetes Application Developer (CKAD)', issuer: 'The Linux Foundation', url: '#' },
  { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', url: '#' },
  { name: 'Google Certified Professional Data Engineer', issuer: 'Google Cloud', url: '#' },
];

export const honorsAndAwards = [
  'Innovatech Hackathon Winner - 2023',
  'Employee of the Year, Data Systems Inc. - 2021',
  'Dean\'s List, University of Technology',
];

export interface Publication {
    title: string;
    authors: string;
    venue: string;
    doi: string;
    summary: string;
}

export const publications: Publication[] = [
    {
        title: "A Novel Approach to Distributed Data Processing",
        authors: "J. Smith, A. Pruthviraj, L. Chen",
        venue: "Proceedings of Big Data Conf, 2021",
        doi: "10.1234/bigdata.2021.67890",
        summary: "This paper introduces a scalable framework for distributed data processing that significantly reduces latency and computational cost compared to existing solutions.",
    },
    {
        title: "Optimizing Convolutional Neural Networks for Image Recognition",
        authors: "J. Doe, S. Lee, M. Garcia",
        venue: "AI Journal, 2020",
        doi: "10.1234/aij.2020.12345",
        summary: "This research proposes a new pruning technique for CNNs that reduces model size by 40% with minimal loss in accuracy.",
    }
];

export interface Project {
  title: string;
  description: string;
  imageUrlId: string;
  url: string;
  date: string;
  location: string;
}

export const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce site with features like product search, cart, and payment integration.',
    imageUrlId: 'project-1',
    url: '#',
    date: '05/2024',
    location: 'Personal Project'
  },
  {
    title: 'Task Management App',
    description: 'A mobile-friendly application to help users organize their daily tasks and improve productivity.',
    imageUrlId: 'project-2',
    url: '#',
    date: '01/2024',
    location: 'Client Work'
  },
  {
    title: 'Data Dashboard',
    description: 'A web-based dashboard for visualizing complex datasets with interactive charts and graphs.',
    imageUrlId: 'project-3',
    url: '#',
    date: '11/2023',
    location: 'Innovatech Solutions'
  },
  {
    title: 'AI Chatbot',
    description: 'A machine learning-powered chatbot for customer service, integrated with a messaging platform.',
    imageUrlId: 'project-4',
    url: '#',
    date: '09/2023',
    location: 'Data Systems Inc.'
  },
];

export const contactInfo = [
    { icon: Mail, text: 'hello@portfoliopilot.com' },
    { icon: Phone, text: '+1 (234) 567-890' },
    { icon: MapPin, text: 'San Francisco, CA' },
];

export const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/' },
    { name: 'Medium', icon: PenSquare, url: 'https://medium.com/' },
    { name: 'X', icon: Twitter, url: 'https://x.com/' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/' },
    { name: 'ResearchGate', icon: FlaskConical, url: 'https://www.researchgate.net/' },
];

export interface Reference {
  fullName: string;
  designation: string;
  organization: string;
  relation: string;
  email: string;
  phone: string;
}

export const references: Reference[] = [
  {
    fullName: "Dr. Emily Carter",
    designation: "Professor of Computer Science",
    organization: "University of Technology",
    relation: "Thesis Advisor",
    email: "emily.carter@example.com",
    phone: "+1-123-456-7890"
  },
  {
    fullName: "Michael Chen",
    designation: "Lead Software Architect",
    organization: "Innovatech Solutions",
    relation: "Direct Supervisor",
    email: "michael.chen@example.com",
    phone: "+1-234-567-8901"
  }
];

export interface MediaItem {
  id: string;
  imageUrlId: string;
  caption: string;
  description: string;
}

export const media: MediaItem[] = [
  {
    id: 'media-1',
    imageUrlId: 'media-1',
    caption: 'Conference Talk',
    description: 'Presenting my research on distributed systems at the 2023 Big Data Conference.',
  },
  {
    id: 'media-2',
    imageUrlId: 'media-2',
    caption: 'Team Hackathon',
    description: 'Our team celebrating our win at the Innovatech annual hackathon.',
  },
  {
    id: 'media-3',
    imageUrlId: 'media-3',
    caption: 'Volunteering Day',
    description: 'Volunteering with my colleagues to clean up a local park.',
  },
];
