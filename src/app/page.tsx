import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomeSection from '@/components/home-section';
import PersonalStatementSection from '@/components/personal-statement-section';
import ResearchProjectsSection from '@/components/research-projects-section';
import TechnicalProjectsSection from '@/components/technical-projects-section';
import EducationSection from '@/components/education-section';
import PublicationsSection from '@/components/publications-section';
import ExperienceSection from '@/components/experience-section';
import AchievementsSection from '@/components/achievements-section';
import SkillsSection from '@/components/skills-section';
import CoursesCertsSection from '@/components/courses-certs-section';
import ReferencesSection from '@/components/references-section';
import ContactSection from '@/components/contact-section';
import MediaSection from '@/components/media-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeSection />
        <PersonalStatementSection />
        <ResearchProjectsSection />
        <TechnicalProjectsSection />
        <EducationSection />
        <PublicationsSection />
        <ExperienceSection />
        <AchievementsSection />
        <SkillsSection />
        <CoursesCertsSection />
        <ReferencesSection />
        <ContactSection />
        <MediaSection />
      </main>
      <Footer />
    </div>
  );
}
