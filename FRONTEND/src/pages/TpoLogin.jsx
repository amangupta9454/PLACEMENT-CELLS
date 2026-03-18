import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert } from 'lucide-react';
import apiClient from '../api/apiClient';
import { AuthContext } from '../context/AuthContext';
import { AnimatedSection } from '../components/AnimatedComponents';
import Navbar from '../components/Navbar';

const TpoLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const { data } = await apiClient.post('/auth/admin-login', { email, password });
      login(data, data.token);
      navigate('/tpo/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Invalid TPO credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <AnimatedSection className="w-full max-w-md z-10">
          <div className="glass-panel p-8 rounded-2xl shadow-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] relative overflow-hidden">
            {/* TPO Badge */}
            <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              ADMIN SECURE
            </div>

            <div className="text-center mb-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <ShieldAlert className="h-8 w-8 text-purple-600 dark:text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">TPO Portal</h2>
              <p className="text-[var(--text-secondary)]">Authorized Personnel Only</p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-secondary)]">Admin Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-[var(--text-primary)]"
                    placeholder="admin@college.edu"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-secondary)]">Master Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-[var(--text-primary)]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl font-medium shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                {loading ? 'Authenticating...' : 'Secure Login'}
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TpoLogin;
