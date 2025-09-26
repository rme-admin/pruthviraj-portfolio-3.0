// lib/types.ts

// Define individual data shapes
export interface Skill {
  id: string;
  name: string;
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

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrlId: string;
  url: string;
  date: string;
  location: string;
  category: 'Technical' | 'Research';
}

export interface Publication {
    id: string;
    title: string;
    authors: string;
    venue: string;
    doi: string;
    summary: string;
}

export interface Achievement {
    id: string;
    description: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    certificateFile: string;
    url?: string;
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

export interface SocialLink {
    id: string;
    name: string;
    url: string;
    icon: string;
}

// Master interface for the final, transformed data object
export interface PortfolioData {
  site_data: any;
  user_details: any;
  skills: Skill[];
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  publications: Publication[];
  achievements: Achievement[];
  courses: Course[];
  references: Reference[];
  media: MediaItem[];
  socialLinks: SocialLink[];
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string; // Optional phone number
  designation: string;
  enquiryType: string; // Corresponds to the 'reason' column in the DB
  message: string;
  date: string;
  status: 'pending' | 'responded' | 'prioritized';
}