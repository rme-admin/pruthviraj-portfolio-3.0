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
  
  if (!portfolioData) {
    return <main className="flex min-h-screen items-center justify-center">Error: Could not load portfolio data.</main>;
  }

  const { 
    user_details, 
    projects, 
    skills, 
    education, 
    experiences, 
    publications, 
    achievements, 
    courses, 
    references, 
    media, 
    socialLinks, 
    site_data 
  } = portfolioData;

  const technicalProjects = projects.filter(p => p.category === 'Technical');
  const researchProjects = projects.filter(p => p.category === 'Research');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeSection userDetails={user_details} />
        <AboutSection userDetails={user_details} technicalProjects={technicalProjects} researchProjects={researchProjects} />
        <EducationSection education={education} />
        <ExperienceSection experiences={experiences} />
        <PublicationsSection publications={publications} />
        <AchievementsSection achievements={achievements} />
        <SkillsSection skills={skills} />
        <CoursesCertsSection certifications={courses} />
        <ReferencesSection references={references} />
        <ContactSection contactInfo={user_details} socialLinks={socialLinks} />
        <MediaSection media={media} />
      </main>
      <Footer copyright={site_data.copyright} />
    </div>
  );
}
