import { getAdminReferences } from '@/lib/actions';
import ReferencesClient from './references-client';

export default async function ReferencesPage() {
  const references = await getAdminReferences();
  return <ReferencesClient initialReferences={references} />;
}