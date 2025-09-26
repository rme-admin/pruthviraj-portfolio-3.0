import { getAdminSkills } from '@/lib/actions';
import SkillsClient from './skills-client';

export default async function SkillsPage() {
  const skills = await getAdminSkills();
  return <SkillsClient initialSkills={skills} />;
}