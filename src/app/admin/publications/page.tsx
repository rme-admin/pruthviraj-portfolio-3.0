import { getAdminPublications } from '@/lib/actions'; // We will create this server action next
import PublicationsClient from './publications-client';


export const dynamic = 'force-dynamic';


export default async function PublicationsPage() {
  const publications = await getAdminPublications();
  return <PublicationsClient initialPublications={publications} />;
}