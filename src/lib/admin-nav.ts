
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
        sublinks: [
            { name: 'List Projects', href: '/admin/projects', icon: List },
            { name: 'Add Project', href: '/admin/projects/new', icon: Plus },
        ]
    },
    {
        name: 'Education',
        href: '/admin/education',
        icon: BookOpen,
        sublinks: [
            { name: 'List Education', href: '/admin/education', icon: List },
            { name: 'Add Education', href: '/admin/education/new', icon: Plus },
        ]
    },
    {
        name: 'Experience',
        href: '/admin/experience',
        icon: Trophy,
        sublinks: [
            { name: 'List Experience', href: '/admin/experience', icon: List },
            { name: 'Add Experience', href: '/admin/experience/new', icon: Plus },
        ]
    },
    {
        name: 'Publications',
        href: '/admin/publications',
        icon: BookCopy,
        sublinks: [
            { name: 'List Publications', href: '/admin/publications', icon: List },
            { name: 'Add Publication', href: '/admin/publications/new', icon: Plus },
        ]
    },
    {
        name: 'Achievements',
        href: '/admin/achievements',
        icon: Medal,
        sublinks: [
            { name: 'List Achievements', href: '/admin/achievements', icon: List },
            { name: 'Add Achievement', href: '/admin/achievements/new', icon: Plus },
        ]
    },
    { name: 'Skills', href: '/admin/skills', icon: Sparkles },
    {
        name: 'Courses & Certs',
        href: '/admin/courses',
        icon: BookCopy,
        sublinks: [
            { name: 'List Courses', href: '/admin/courses', icon: List },
            { name: 'Add Course', href: '/admin/courses/new', icon: Plus },
        ]
    },
    { name: 'References', href: '/admin/references', icon: Users },
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
