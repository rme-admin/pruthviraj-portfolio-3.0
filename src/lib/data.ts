import type { PortfolioData } from './types';

/**
 * Fetches data from the portfolio API and transforms it to match the frontend's expected data structures.
 * @returns {Promise<PortfolioData | null>} A promise resolving to the transformed data, or null on error.
 */
export async function getPortfolioData(): Promise<PortfolioData | null> {
  // Directly use the environment variable for the server-side fetch.
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL or NEXT_PUBLIC_API_BASE_URL environment variable is not set.");
  }
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/portfolio-data`, { cache: 'no-store' });

    if (!res.ok) {
      if (res.status === 404) {
        console.error(`API request failed: 404 Not Found. Check if the endpoint ${API_BASE_URL}/api/portfolio-data exists and is correct.`);
      } else {
        console.error(`API request failed: ${res.status} ${res.statusText}`);
      }
      const errorBody = await res.text();
      console.error(`Error body: ${errorBody}`);
      return null;
    }

    const rawData: any = await res.json();
    if (!rawData) return null;

    const createFullUrl = (path: string | null) => (path ? `${API_BASE_URL}/${path}` : '');

    const transformedData: PortfolioData = {
      site_data: rawData.site_data,
      user_details: {
        ...rawData.user_details,
        profile_url: createFullUrl(rawData.user_details.profile_url),
      },
      
      skills: Object.entries(rawData.skills || {}).flatMap(([category, skillNames], catIndex) =>
        (Array.isArray(skillNames) ? skillNames : []).map((skill: any, skillIndex: number) => ({
          id: `skill-${category}-${catIndex}-${skillIndex}`,
          name: typeof skill === 'string' ? skill : skill?.name,
          icon: typeof skill === 'object' && skill?.icon ? skill.icon : 'Code',
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
        marksType: edu.entry_type === 'Postgraduate' ? 'cgpa' : 'percentage'
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
    if (error instanceof TypeError && error.message === 'fetch failed') {
      console.error("Network Error: Could not connect to the API endpoint. Please ensure the backend server is running and accessible at the specified API_BASE_URL.", error);
    } else {
      console.error("An unexpected error occurred in getPortfolioData:", error);
    }
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


