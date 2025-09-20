
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

export default async function Home() {
  const portfolioData = await getPortfolioData();

  // If data fetching fails, we render the page with empty/null data.
  // The individual components are responsible for handling this gracefully.
  const userDetails = portfolioData?.user_details || null;
  const technicalProjects = portfolioData?.projects.filter(p => p.category === 'Technical') || [];
  const researchProjects = portfolioData?.projects.filter(p => p.category === 'Research') || [];
  const education = portfolioData?.education || [];
  const experiences = portfolioData?.experiences || [];
  const publications = portfolioData?.publications || [];
  const achievements = portfolioData?.achievements || [];
  const skills = portfolioData?.skills || [];
  const certifications = portfolioData?.courses || [];
  const references = portfolioData?.references || [];
  const socialLinks = portfolioData?.socialLinks || [];
  const media = portfolioData?.media || [];
  const copyright = portfolioData?.site_data?.copyright || `© ${new Date().getFullYear()} Portfolio Pilot. All rights reserved.`;
  
  // The contactInfo object is derived from user_details
  const contactInfo = userDetails ? {
    email: userDetails.email, // Assuming email is available
    phone_number: userDetails.phone_number,
    address: userDetails.address
  } : {};


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
