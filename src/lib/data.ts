
import type { PortfolioData } from './types';

/**
 * Fetches data from the portfolio API and transforms it to match the frontend's expected data structures.
 * @returns {Promise<PortfolioData | null>} A promise resolving to the transformed data, or null on error.
 */
export async function getPortfolioData(): Promise<PortfolioData | null> {
  try {
    const apiUrl = `${process.env.API_BASE_URL}/api/portfolio-data`;
    const res = await fetch(apiUrl, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`API request failed: ${res.statusText}`);
      return null;
    }

    const rawData: any = await res.json();
    if (!rawData) return null;

    const API_BASE_URL = process.env.API_BASE_URL;
    const createFullUrl = (path: string | null) => (path ? `${API_BASE_URL}/${path}` : '');

    const transformedData: PortfolioData = {
      site_data: rawData.site_data,
      user_details: {
        ...rawData.user_details,
        profile_url: createFullUrl(rawData.user_details.profile_url),
      },
      
      skills: Object.entries(rawData.skills || {}).flatMap(([category, skillNames]: [string, any[]], catIndex) => 
        (skillNames || []).map((skill: any, skillIndex) => ({
          id: `skill-${category}-${catIndex}-${skillIndex}`,
          name: skill.name || skill,
          icon: skill.icon || 'Code', 
          category: category as 'Technical' | 'Research' | 'Hobby',
        }))
      ),

      education: (rawData.education || []).map((edu: any, index: number) => ({
        id: `edu-${index}`,
        institution: edu.institute,
        degree: edu.course,
        period: edu.period,
        description: edu.description,
        marksScored: edu.mark_obtained,
        marksOutOf: edu.max_mark,
        marksType: 'cgpa' // Assuming cgpa, can be made dynamic if API provides it
      })),
      
      experiences: (rawData.experience || []).map((exp: any, index: number) => ({
        id: `exp-${index}`,
        company: exp.company,
        role: exp.role,
        period: exp.period,
        description: exp.description,
      })),

      projects: (rawData.projects || []).map((proj: any, index: number) => ({
        id: `proj-${index}`,
        title: proj.title,
        description: proj.description,
        imageUrlId: createFullUrl(proj.img_url),
        url: proj.live_link,
        date: new Date(proj.date).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
        location: proj.location,
        category: proj.category,
      })),
      
      publications: (rawData.publications || []).map((pub: any, index: number) => ({
        id: `pub-${index}`,
        title: pub.title,
        authors: pub.author,
        venue: pub.venue,
        doi: pub.doi,
        summary: pub.summary,
      })),

      achievements: (rawData.achievements || []).map((ach: any, index: number) => ({
        id: `ach-${index}`,
        description: ach.achievement,
      })),

      courses: (rawData.courses_n_certificates || []).map((course: any, index: number) => ({
          id: `course-${index}`,
          name: course.course_name,
          issuer: course.issuer,
          certificateFile: course.certificate_url,
          url: course.certificate_url,
      })),
      
      references: (rawData.reference_person || []).map((ref: any, index: number) => ({
        id: `ref-${index}`,
        fullName: ref.full_name,
        designation: ref.designation,
        organization: ref.organization,
        relation: ref.relation,
        email: ref.email,
        phone: ref.phone,
      })),

      media: (rawData.media || []).map((item: any, index: number) => ({
        id: `media-${index}`,
        imageUrlId: createFullUrl(item.img_url),
        caption: item.caption,
        description: item.description,
      })),

      socialLinks: (rawData.social_links || []).map((link: any, index: number) => ({
        id: `social-${index}`,
        name: link.name,
        url: link.url,
        icon: createFullUrl(link.icon_url),
      })),
    };

    return transformedData;

  } catch (error) {
    console.error("Error in getPortfolioData:", error);
    return null;
  }
}

export const primaryNavigationLinks: any[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
];

export const secondaryNavigationLinks: any[] = [
  { name: 'Projects', href: '/allprojects' },
  { name: 'Publications', href: '#publications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Skills', href: '#skills' },
  { name: 'Courses and Certificates', href: '#courses-certifications' },
  { name: 'References', href: '#references' },
  { name: 'Contact Me', href: '#contact' },
  { name: 'Media', href: '#media' },
];

export const contactInfo: any[] = [];
export const enquiries: any[] = [];
