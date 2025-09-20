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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <PublicationsSection />
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
