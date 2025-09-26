import { getAdminSocialLinks } from '@/lib/actions';
import SocialLinksClient from './social-client';

export const dynamic = 'force-dynamic';


export default async function SocialLinksPage() {
  const socialLinks = await getAdminSocialLinks();
  return <SocialLinksClient initialLinks={socialLinks} />;
}