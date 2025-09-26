import { getAdminEnquiries } from '@/lib/actions';
import EnquiriesClient from './enquiries-client';
export default async function EnquiriesPage() {
const enquiries = await getAdminEnquiries();
return <EnquiriesClient initialEnquiries={enquiries} />;
}