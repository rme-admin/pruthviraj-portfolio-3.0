// src/app/page.tsx

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomeSection from '@/components/home-section';
import AboutSection from '@/components/about-section';
import PublicationsSection from '@/components/publications-section';
import AchievementsSection from '@/components/achievements-section';
import SkillsSection from '@/components/skills-section';
import CoursesCertsSection from '@/components/courses-certs-section';
import ReferencesSection from '@/components/references-section';
import ContactSection from '@/components/contact-section';
import MediaSection from '@/components/media-section';
import EducationSection from '@/components/education-section';
import ExperienceSection from '@/components/experience-section';
import { getPortfolioData } from '@/lib/data';
import ProjectsSection from '@/components/projects-section'; 

export const dynamic = 'force-dynamic';



export default async function Home() {
  const portfolioData = await getPortfolioData();

    
  // First, handle the case where the entire API call fails.
  if (!portfolioData) {
    return (
      <main className="flex-grow">
        <div className="container mx-auto py-10 text-center">
          <p className="text-destructive font-bold">Error: Could not load portfolio data.</p>
          <p className="text-muted-foreground">The backend API might be offline or inaccessible.</p>
        </div>
      </main>
    );
  }

  // If we get here, portfolioData is a valid object.
  // Now we can safely destructure with individual fallbacks.
  const {
    user_details: userDetails, // Can be null if not found
    projects = [],
    education = [],
    experiences = [],
    publications = [],
    achievements = [],
    skills = [],
    courses_n_certificates: certifications = [], // Rename and provide fallback
    references = [],
    social_links: socialLinks = [], // Rename and provide fallback
    media = [],
    site_data: siteData, // Can be null if not found
  } = portfolioData;

  // Now that 'projects' is guaranteed to be an array, this is safe.
  const technicalProjects = projects.filter(p => p.category === 'Technical');
  const researchProjects = projects.filter(p => p.category === 'Research');

  const copyright = siteData?.copyright || `© ${new Date().getFullYear()} Pruthviraj Portfolio. All rights reserved.`;

  const contactInfo = userDetails; 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeSection userDetails={userDetails} />
        <AboutSection userDetails={userDetails} technicalProjects={technicalProjects} researchProjects={researchProjects} />
        <EducationSection education={education} />
        <ExperienceSection experiences={experiences} />
        <PublicationsSection publications={publications} />
        <AchievementsSection achievements={achievements} />
        <SkillsSection skills={skills} />
        <CoursesCertsSection certifications={certifications} />
        <ReferencesSection references={references} />
        <ContactSection contactInfo={contactInfo} socialLinks={socialLinks} />
        <MediaSection media={media} />
      </main>
      <Footer copyright={copyright} />
    </div>
  );
}
