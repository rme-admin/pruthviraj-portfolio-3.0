import { LucideIcon } from 'lucide-react';
import data from './portfolio-data.json';

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
  { name: 'Projects', href: '/allprojects' },
  { name: 'Publications', href: '#publications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Skills', href: '#skills' },
  { name: 'Courses and Certificates', href: '#courses-certifications' },
  { name: 'References', href: '#references' },
  { name: 'Contact Me', href: '#contact' },
  { name: 'Media', href: '#media' },
];

export interface Skill {
  id: string;
  name: string;
  // This will be a string representing the lucide icon name
  icon: string;
  category: 'Technical' | 'Research' | 'Hobby';
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    period: string;
    description: string;
    marksType?: 'cgpa' | 'percentage';
    marksScored?: string;
    marksOutOf?: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  imageUrlId: string;
  date: string;
  location: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    certificateFile: string;
}

export interface Publication {
    id: string;
    title: string;
    authors: string;
    venue: string;
    doi: string;
    summary: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrlId: string;
  url: string;
  date: string;
  location: string;
}

export interface ContactInfo {
    // This will be a string representing the lucide icon name
    icon: string;
    text: string;
}

export interface SocialLink {
    id: string;
    name: string;
    url: string;
    icon: string;
}

export interface Reference {
  id: string;
  fullName: string;
  designation: string;
  organization: string;
  relation: string;
  email: string;
  phone: string;
}

export interface MediaItem {
  id: string;
  imageUrlId: string;
  caption: string;
  description: string;
}

export interface Achievement {
    id: string;
    description: string;
}

export interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    designation: string;
    enquiryType: string;
    message: string;
    date: string;
}


export const skills: Skill[] = data.skills;
export const education: Education[] = data.education;
export const experiences: Experience[] = data.experiences;
export const researchProjects: ResearchProject[] = data.researchProjects;
export const certifications: Certification[] = data.certifications;
export const honorsAndAwards: Achievement[] = data.honorsAndAwards;
export const publications: Publication[] = data.publications;
export const projects: Project[] = data.projects;
export const contactInfo: ContactInfo[] = data.contactInfo;
export const socialLinks: SocialLink[] = data.socialLinks;
export const references: Reference[] = data.references;
export const media: MediaItem[] = data.media;
export const enquiries: Enquiry[] = data.enquiries;