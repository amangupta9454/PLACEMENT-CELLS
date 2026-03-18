import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  FileText,
  Bell,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Jobs', path: '/student/jobs', icon: Briefcase },
    { name: 'My Applications', path: '/student/applications', icon: FileText },
    { name: 'Profile & Resume', path: '/student/profile', icon: Settings },
  ];

  const tpoLinks = [
    { name: 'Dashboard', path: '/tpo/dashboard', icon: LayoutDashboard },
    { name: 'Manage Students', path: '/tpo/students', icon: Users },
    { name: 'Manage Jobs', path: '/tpo/jobs', icon: Briefcase },
    { name: 'Applicants', path: '/tpo/applicants', icon: FileText },
    { name: 'Announcements', path: '/tpo/announcements', icon: Bell },
    { name: 'Feedback', path: '/tpo/reviews', icon: Star },
  ];

  const links = role === 'tpo' ? tpoLinks : studentLinks;

  return (
    <div className="w-64 min-h-[calc(100vh-4rem)] glass-panel border-r border-[var(--panel-border)] bg-[var(--bg-secondary)] hidden lg:block pt-6 transition-colors duration-300">
      <div className="flex flex-col space-y-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.includes(link.path);

          return (
            <Link
              key={link.name}
              to={link.path}
              className="relative group"
            >
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-tab"
                  className="absolute inset-0 bg-blue-100 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-500/20 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg relative z-10 transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-500/10'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium text-sm">{link.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
