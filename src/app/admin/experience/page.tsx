import { getAdminExperience } from '@/lib/actions'; // We will create this server action next
import ExperienceClient from './experience-client';

export default async function ExperiencePage() {
  const experience = await getAdminExperience();
  return <ExperienceClient initialExperience={experience} />;
}