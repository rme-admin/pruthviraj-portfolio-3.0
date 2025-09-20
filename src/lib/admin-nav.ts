
import {
    LayoutDashboard,
    Home,
    FileText,
    List,
    Plus,
    BookOpen,
    Trophy,
    Sparkles,
    Medal,
    BookCopy,
    Users,
    Mail,
    Settings,
    Image,
    LucideIcon,
    User,
    Award,
    Link as LinkIcon,
} from 'lucide-react';

export interface NavLink {
    name: string;
    href: string;
    icon: LucideIcon;
    sublinks?: NavLink[];
}

export const adminNavigationLinks: NavLink[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'My Info', href: '/admin/my-info', icon: User },
    {
        name: 'Projects',
        href: '/admin/projects',
        icon: List,
    },
    {
        name: 'Education',
        href: '/admin/education',
        icon: BookOpen,
    },
    {
        name: 'Experience',
        href: '/admin/experience',
        icon: Trophy,
    },
    {
        name: 'Publications',
        href: '/admin/publications',
        icon: BookCopy,
    },
    {
        name: 'Achievements',
        href: '/admin/achievements',
        icon: Medal,
    },
    { name: 'Skills', href: '/admin/skills', icon: Sparkles },
    {
        name: 'Courses & Certs',
        href: '/admin/courses',
        icon: Award,
    },
    {
        name: 'References',
        href: '/admin/references',
        icon: Users,
    },
    { name: 'Enquiries', href: '/admin/enquiries', icon: Mail },
    {
        name: 'Media',
        href: '/admin/media',
        icon: Image,
    },
    { name: 'Social Links', href: '/admin/social', icon: LinkIcon },
];
