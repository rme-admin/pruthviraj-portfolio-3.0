import { getAdminMedia } from '@/lib/actions';
import MediaClient from './media-client';

export default async function MediaPage() {
  const media = await getAdminMedia();
  return <MediaClient initialMedia={media} />;
}