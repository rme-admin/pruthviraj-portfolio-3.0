
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
} from 'lucide-react';

export interface NavLink {
    name: string;
    href: string;
    icon: LucideIcon;
    sublinks?: NavLink[];
}

export const adminNavigationLinks: NavLink[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
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
    { name: 'Social Media', href: '/admin/social', icon: Users },
    {
        name: 'Media',
        href: '/admin/media',
        icon: Image,
        sublinks: [
            { name: 'List Media', href: '/admin/media', icon: List },
            { name: 'Add Media', href: '/admin/media/new', icon: Plus },
        ]
    },
];
