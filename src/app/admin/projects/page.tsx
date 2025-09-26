// 1. Import ONLY what is needed: the server action and the client component.
import { getAdminProjects } from '@/lib/actions';
import ProjectsClient from './projects-client';

// 2. The page component is now very clean. It's a Server Component by default.
export default async function ProjectsPage() {
  
  // 3. Call the imported server action to fetch the data securely.
  // This function runs on the server, handles auth, and transforms the data.
  const projects = await getAdminProjects();
  
  // 4. Render the client component, passing the fetched data as a prop.
  return <ProjectsClient initialProjects={projects} />;
}