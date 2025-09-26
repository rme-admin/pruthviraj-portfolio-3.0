//admin/layout.tsx
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AdminSidebar from './components/sidebar';
import { usePathname } from 'next/navigation';
import { adminNavigationLinks } from '@/lib/admin-nav';

function getPageTitle(pathname: string): string {
    for (const link of adminNavigationLinks) {
        if (link.href === pathname) {
            return link.name;
        }
        if (link.sublinks) {
            for (const sublink of link.sublinks) {
                if (sublink.href === pathname) {
                    return sublink.name;
                }
            }
        }
    }
    // Fallback for nested pages like /admin/projects/new
    const segments = pathname.split('/').filter(Boolean);
    if(segments.length > 2) {
        const parentPath = `/${segments[0]}/${segments[1]}`;
        const parentLink = adminNavigationLinks.find(link => link.href === parentPath || link.sublinks?.some(sub => sub.href === parentPath));
        if (parentLink) {
            const pageName = segments[segments.length - 1];
            // Capitalize first letter
            return pageName.charAt(0).toUpperCase() + pageName.slice(1);
        }
    }

    return 'Admin';
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <SidebarProvider>
      <Sidebar>
        <AdminSidebar />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="w-full flex-1">
                <h1 className="text-lg font-semibold">{pageTitle}</h1>
            </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
