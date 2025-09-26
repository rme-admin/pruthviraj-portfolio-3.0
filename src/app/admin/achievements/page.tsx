import { getAdminAchievements } from '@/lib/actions';
import AchievementsClient from './achievements-client';

export const dynamic = 'force-dynamic';


export default async function AchievementsPage() {
  const achievements = await getAdminAchievements();
  return <AchievementsClient initialAchievements={achievements} />;
}