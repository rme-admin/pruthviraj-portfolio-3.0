//education/page.tsx

import { getAdminEducation } from '@/lib/actions'; // We will create this server action next
import EducationClient from './education-client';

export default async function EducationPage() {
  const education = await getAdminEducation();
  return <EducationClient initialEducation={education} />;
}