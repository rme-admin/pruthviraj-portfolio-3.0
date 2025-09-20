
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Rocket, LogOut } from 'lucide-react';
import { adminNavigationLinks } from '@/lib/admin-nav';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Rocket className="h-7 w-7 text-primary" />
            <span className="font-headline text-2xl font-bold">Admin Panel</span>
            <div className="ml-auto">
                <SidebarTrigger />
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminNavigationLinks.map((link) => (
            <SidebarMenuItem key={link.name}>
              {link.sublinks ? (
                <>
                  <SidebarMenuButton
                    isActive={link.sublinks.some(sub => pathname.startsWith(sub.href))}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {link.sublinks.map((sublink) => (
                      <SidebarMenuSubItem key={sublink.name}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === sublink.href}
                        >
                          <Link href={sublink.href}>
                            <sublink.icon className="h-4 w-4" />
                            <span>{sublink.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                >
                  <Link href={link.href}>
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/">
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
