import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { getPortfolioData } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();

  const PLACEHOLDER_ICON = '/placeholder-icon.png'; // Place this image in your public folder

  if (!data || !data.site_data) {
    return {
      title: 'Pruthviraj Portfolio',
      description: 'A personal portfolio to showcase projects and skills.',
      icons: {
        icon: PLACEHOLDER_ICON,
        shortcut: PLACEHOLDER_ICON,
      },
    };
  }

  const { site_data } = data;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

  return {
    title: site_data.title,
    description: site_data.description, // Assuming description exists in site_data
    keywords: site_data.keywords,
    icons: {
      icon: site_data.icon_url
        ? `${API_BASE_URL}/${site_data.icon_url}`
        : PLACEHOLDER_ICON,
      shortcut: site_data.favicon_url
        ? `${API_BASE_URL}/${site_data.favicon_url}`
        : PLACEHOLDER_ICON,
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
