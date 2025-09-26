'use server'; // This directive marks all functions in this file as Server Actions

import { cookies } from 'next/headers';

import type { Project, Education, Experience,Publication, Achievement, Reference, Skill, MediaItem,Certification, SocialLink,Enquiry } from './types';



// This function ONLY runs on the server. It is secure.
export async function getAdminProjects(): Promise<Project[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    if (!token) {
      console.log('Authentication token not found.');
      return []; // Return empty if not authenticated
    }

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store', // Always fetch the latest data for the admin panel
    });

    if (!response.ok) {
      // Log the error for server-side debugging
      console.error('Failed to fetch admin projects:', response.status, response.statusText);
      return []; // Return empty on a failed request
    }

    const projects: Project[] = await response.json();
    
    // Now we must transform the data to add the full image URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    return projects.map(p => ({
      ...p,
      img_url: p.img_url ? `${API_BASE_URL}/${p.img_url}` : null
    }));

  } catch (error) {
    console.error('An error occurred in getAdminProjects:', error);
    return []; // Return empty on any exception
  }
}

//for the education section

export async function getAdminEducation(): Promise<Education[]> {
  try {
    // Read the cookie store
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('authToken');

    if (!tokenCookie || !tokenCookie.value) {
      console.log('Authentication token not found for education.');
      return [];
    }
    
    const token = tokenCookie.value;

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/education`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin education:', response.statusText);
      return [];
    }

    return response.json();

  } catch (error) {
    console.error('Error in getAdminEducation:', error);
    return [];
  }
}

// =================================================================
// SERVER ACTION FOR ADMIN EXPERIENCE
// =================================================================
export async function getAdminExperience(): Promise<Experience[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) {
      console.log('Authentication token not found for experience.');
      return [];
    }
    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/experience`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!response.ok) {
      console.error('Failed to fetch admin experience:', response.statusText);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error('Error in getAdminExperience:', error);
    return [];
  }
}

// =================================================================
// END SERVER ACTION FOR ADMIN PUBLICATIONS
// =================================================================

export async function getAdminPublications(): Promise<Publication[]> {
  try {
    const cookieStore = await cookies();
    
    const token = cookieStore.get('authToken')?.value;
    if (!token) return [];

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/publications`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin publications:', response.statusText);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error('Error in getAdminPublications:', error);
    return [];
  }
}

// =================================================================
// END SERVER ACTION FOR ADMIN ACHIEVEMENTS
// =================================================================

export async function getAdminAchievements(): Promise<Achievement[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) return [];

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/achievements`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin achievements:', response.statusText);
      return [];
    }
    
    const rawAchievements = await response.json();

    // Transform the data: map 'achievement' from API to 'description' for the frontend
    return rawAchievements.map((ach: any) => ({
      id: ach.id,
      description: ach.achievement,
    }));

  } catch (error) {
    console.error('Error in getAdminAchievements:', error);
    return [];
  }
}
// =================================================================
// END SERVER ACTION FOR ADMIN Skills
// =================================================================
export async function getAdminSkills(): Promise<Skill[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) return [];

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/skills`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin skills:', response.statusText);
      return [];
    }
    
    const rawSkills = await response.json();

    // Transform data: map 'skill_name' from API to 'name' for the frontend
    return rawSkills.map((skill: any) => ({
      id: skill.id,
      name: skill.skill_name,
      category: skill.category,
      icon: '', // Add placeholder for icon if needed by the type
    }));

  } catch (error) {
    console.error('Error in getAdminSkills:', error);
    return [];
  }
}

// =================================================================
// END SERVER ACTION FOR ADMIN COURSES
// =================================================================
export async function getAdminCourses(): Promise<Certification[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) return [];

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/courses`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin courses:', response.statusText);
      return [];
    }
    
    const rawCourses = await response.json();

    // Transform data: map backend names to frontend names
    return rawCourses.map((course: any) => ({
      id: course.id,
      name: course.course_name,
      issuer: course.issuer,
      certificateFile: course.certificate_url,
    }));

  } catch (error) {
    console.error('Error in getAdminCourses:', error);
    return [];
  }
}

// =================================================================
// END SERVER ACTION FOR ADMIN REFERENCES
// =================================================================
export async function getAdminReferences(): Promise<Reference[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) return [];

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/references`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin references:', response.statusText);
      return [];
    }
    
    const rawReferences = await response.json();

    // Transform data: map 'full_name' from API to 'fullName' for the frontend
    return rawReferences.map((ref: any) => ({
      id: ref.id,
      fullName: ref.full_name,
      designation: ref.designation,
      organization: ref.organization,
      relation: ref.relation,
      email: ref.email,
      phone: ref.phone,
    }));

  } catch (error) {
    console.error('Error in getAdminReferences:', error);
    return [];
  }
}

// =================================================================
// END SERVER ACTION FOR ADMIN MEDIA
// =================================================================
export async function getAdminMedia(): Promise<MediaItem[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) return [];

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/media`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin media:', response.statusText);
      return [];
    }
    
    const rawMedia = await response.json();

    // Transform data: map 'img_url' from API to 'imageUrlId' for the frontend
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    return rawMedia.map((item: any) => ({
      id: item.id,
      caption: item.caption,
      description: item.description,
      imageUrlId: item.img_url ? `${API_BASE_URL}/${item.img_url}` : '',
    }));

  } catch (error) {
    console.error('Error in getAdminMedia:', error);
    return [];
  }
}

// =================================================================
// END SERVER ACTION FOR ADMIN SOCIAL LINKS
// =================================================================
export async function getAdminSocialLinks(): Promise<SocialLink[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) return [];

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/social-links`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin social links:', response.statusText);
      return [];
    }
    
    const rawLinks = await response.json();

    // Transform data: create the full icon URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    return rawLinks.map((link: any) => ({
      id: link.id,
      name: link.name,
      url: link.url,
      icon: link.icon_url ? `${API_BASE_URL}/${link.icon_url}` : '',
    }));

  } catch (error) {
    console.error('Error in getAdminSocialLinks:', error);
    return [];
  }
}

// =================================================================
// CONTACT FORM Enquiry (API INTEGRATED)
// =================================================================

export async function getAdminEnquiries(): Promise<Enquiry[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) return [];

    const response = await fetch(`${process.env.API_BASE_URL}/api/admin/enquiries`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch admin enquiries:', response.statusText);
      return [];
    }
    
    const rawEnquiries = await response.json();

    // Transform data to match the frontend's expected shape
    return rawEnquiries.map((enq: any) => ({
      id: enq.id,
      name: enq.name,
      email: enq.email,
      phone: enq.phone,
      designation: enq.designation,
      enquiryType: enq.reason,
      message: enq.message,
      date: new Date(enq.date).toLocaleDateString(),
      status: enq.status, 
    }));

  } catch (error) {
    console.error('Error in getAdminEnquiries:', error);
    return [];
  }
}