import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-[var(--panel-border)] bg-[var(--bg-secondary)] pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Placement Cell
              </span>
            </div>
            <p className="text-[var(--text-secondary)] max-w-sm mb-6">
              The premier platform connecting ambitious students with industry-leading companies for premium career opportunities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-100 dark:bg-white/5 flex items-center justify-center text-blue-600 dark:text-gray-400 hover:text-white hover:bg-blue-500 dark:hover:bg-blue-500/20 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-purple-100 dark:bg-white/5 flex items-center justify-center text-purple-600 dark:text-gray-400 hover:text-white hover:bg-purple-500 dark:hover:bg-purple-500/20 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-gray-400 hover:text-white hover:bg-gray-800 dark:hover:bg-white/20 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--text-primary)] font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[var(--text-secondary)] hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-[var(--text-secondary)] hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/placement-data" className="text-[var(--text-secondary)] hover:text-blue-500 transition-colors">Placement Data</Link></li>
              <li><Link to="/contact" className="text-[var(--text-secondary)] hover:text-blue-500 transition-colors">Contact</Link></li>
              <li><Link to="/student-login" className="text-[var(--text-secondary)] hover:text-blue-500 transition-colors">Student Portal</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[var(--text-primary)] font-bold mb-4">Legal & Support</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-[var(--text-secondary)] hover:text-purple-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[var(--text-secondary)] hover:text-purple-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/rules" className="text-[var(--text-secondary)] hover:text-purple-500 transition-colors">Rules & Regulations</Link></li>
              <li><Link to="/eligibility" className="text-[var(--text-secondary)] hover:text-purple-500 transition-colors">Eligibility Criteria</Link></li>
              <li><Link to="/tpo-login" className="text-[var(--text-secondary)] hover:text-purple-500 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--panel-border)] pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--text-secondary)]">
          <p>© {new Date().getFullYear()} Placement Cell. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built for excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
