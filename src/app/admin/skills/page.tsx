import { getAdminSkills } from '@/lib/actions';
import SkillsClient from './skills-client';

export const dynamic = 'force-dynamic';


export default async function SkillsPage() {
  const skills = await getAdminSkills();
  return <SkillsClient initialSkills={skills} />;
}