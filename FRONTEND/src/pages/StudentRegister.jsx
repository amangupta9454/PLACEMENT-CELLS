import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, KeyRound } from 'lucide-react';
import apiClient from '../api/apiClient';
import { AuthContext } from '../context/AuthContext';
import { AnimatedSection } from '../components/AnimatedComponents';
import Navbar from '../components/Navbar';

const StudentRegister = () => {
  const [step, setStep] = useState(1); // 1 = Details, 2 = OTP
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const { data } = await apiClient.post('/auth/register', formData);
      setSuccess(data.message || 'OTP sent to your email.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const { data } = await apiClient.post('/auth/verify-otp', { email: formData.email, otp });
      login(data, data.token);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[40rem] h-[40rem] bg-emerald-600/10 rounded-full blur-[100px]" />
        </div>

        <AnimatedSection className="w-full max-w-md z-10">
          <div className="glass-panel p-8 rounded-2xl shadow-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)]">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Create Account</h2>
              <p className="text-[var(--text-secondary)]">
                {step === 1 ? 'Start your placement journey' : 'Verify your email address'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-3 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm text-center">
                {success}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-[var(--text-primary)]"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">College Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-[var(--text-primary)]"
                      placeholder="student@college.edu"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-[var(--text-primary)]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-medium shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
                >
                  {loading ? 'Sending OTP...' : 'Register & Get OTP'}
                </button>

                <p className="text-center text-sm text-[var(--text-secondary)]">
                  Already have an account?{' '}
                  <Link to="/student-login" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
                    Log in
                  </Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Enter 6-digit OTP</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-center tracking-[0.5em] text-2xl font-mono bg-[var(--bg-secondary)] border border-[var(--panel-border)] rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-[var(--text-primary)]"
                      placeholder="------"
                    />
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] text-center mt-2">OTP sent to {formData.email}</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-medium shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
                >
                  {loading ? 'Verifying...' : 'Verify OTP & Complete'}
                </button>
                
                <button
                  type="button"
                  onClick={() => { setStep(1); setOtp(''); setSuccess(''); setError(''); }}
                  className="w-full py-3 px-4 bg-[var(--bg-secondary)] border border-[var(--panel-border)] hover:bg-[var(--panel-border)] text-[var(--text-primary)] rounded-xl font-medium transition-all"
                >
                  Back to Registration
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default StudentRegister;
