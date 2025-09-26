//courses/page.tsx

import { getAdminCourses } from '@/lib/actions';
import CoursesClient from './courses-client';

export default async function CoursesPage() {
  const courses = await getAdminCourses();
  return <CoursesClient initialCourses={courses} />;
}