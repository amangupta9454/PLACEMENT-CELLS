import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, LogOut, LayoutDashboard, Home, Info, Phone, LogIn, Briefcase } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={16} /> },
    { name: 'Internships', path: '/internships', icon: <Briefcase size={16} /> },
    { name: 'About', path: '/about', icon: <Info size={16} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={16} /> },
  ];

  if (!user) {
    navLinks.push({ name: 'Student Login', path: '/student-login', icon: <LogIn size={16} /> });
    navLinks.push({ name: 'TPO Login', path: '/tpo-login', icon: <LogIn size={16} /> });
  } else if (user.role === 'student') {
    navLinks.push({ name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={16} /> });
  } else if (user.role === 'tpo') {
    navLinks.push({ name: 'Dashboard', path: '/tpo/dashboard', icon: <LayoutDashboard size={16} /> });
  }

  return (
    <nav
      ref={menuRef}
      className="fixed w-full z-50 glass-panel border-b border-[var(--panel-border)] shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* ── Left: Logos ── */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <img
              src="/logo.png"
              alt="Placement Cell Logo"
              className="h-9 sm:h-12 w-auto object-contain cursor-pointer bg-white p-1 rounded-md shadow-sm transition-transform hover:scale-105 flex-shrink-0"
              onClick={() => navigate('/')}
            />
            <a href="https://www.hiet.org/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
              <img
                src="/hiet.png"
                alt="HIET Logo"
                className="h-9 sm:h-12 w-auto object-contain cursor-pointer bg-white p-1 rounded-md shadow-sm transition-transform hover:scale-105"
              />
            </a>
            <a href="https://sunstone.in/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
              <img
                src="/sunstone.jpg"
                alt="Sunstone Logo"
                className="h-9 sm:h-12 w-auto object-contain cursor-pointer bg-white p-1 rounded-md shadow-sm transition-transform hover:scale-105"
              />
            </a>
          </div>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-blue-500/15 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-blue-50/70 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Logout */}
            {user && (
              <button
                onClick={handleLogout}
                className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>

          {/* ── Mobile: hamburger ── */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-blue-50/60 transition-all duration-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'var(--panel-bg)', backdropFilter: 'blur(16px)' }}
      >
        <div className="border-t border-[var(--panel-border)] px-3 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? 'bg-blue-500/15 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-blue-50/70 hover:text-blue-600'
              }`}
            >
              <span className="opacity-70">{link.icon}</span>
              {link.name}
            </Link>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut size={16} className="opacity-70" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
